import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps } from "next";
import glob from "glob";
import jimp from "jimp";
import { titleCase } from "title-case";
import cheerio from "cheerio";

import { PagePost } from "../../modules/page-article/page-article.component";
import {
  htmlContentSelector,
  metadataSelector
} from "../../modules/page-article/page-article.selector";
import { PageArticleProps } from "../../modules/page-article/page-article";

const articlesDir = path.join(process.cwd(), "articles");
const publicDir = path.join(process.cwd(), "public");

export const getStaticPaths = async () => {
  const filenames = await fs.readdir(articlesDir);
  const paths = filenames.map(filename => {
    const slug = path.parse(filename).name;

    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: false
  };
};

const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

const toAbsolutePaths = (html: string, basePath: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src") || "";

    if (!isAbsoluteUrl(src)) {
      $(elem).attr("src", path.join(basePath, src));
    }
  });

  return $.html();
};

const toTitleCase = (html: string) => {
  const $ = cheerio.load(html);

  $("h1,h2,h3,h4,h5,h6").each((index, elem) => {
    const title = $(elem).text();

    $(elem).text(titleCase(title));
  });

  return $.html();
};

const optimizeImage = async (imagePath: string) => {
  const image = await jimp.read(imagePath);

  if (image.getWidth() > 960) {
    await image.resize(960, jimp.AUTO);
  }

  await image.quality(50);
  await image.writeAsync(imagePath);
};

export const getStaticProps: GetStaticProps<PageArticleProps> = async ({
  params
}: any) => {
  const articleDir = path.join(articlesDir, params.slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const articleImagesGlob = path.join(articleDir, "**/*.{jpeg,jpg,png,gif}");
  const basePath = path.join("/article", params.slug);
  const htmlContent = toTitleCase(
    toAbsolutePaths(htmlContentSelector(articleFilePath), basePath)
  );
  const metadata = metadataSelector(htmlContent, articleFilePath);

  // TODO: await file copy
  glob(articleImagesGlob, async (err, files) => {
    if (err) return;

    for (const file of files) {
      const fileName = file.replace(articlesDir, "");
      const dest = path.join(publicDir, "article", fileName);

      await fs.mkdir(path.parse(dest).dir, {
        recursive: true
      });

      await fs.copyFile(file, dest);
      await optimizeImage(dest);
    }
  });

  return {
    props: {
      htmlContent,
      metadata
    }
  };
};

export default PagePost;

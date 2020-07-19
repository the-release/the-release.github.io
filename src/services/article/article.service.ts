import path from "path";
import { promises as fs } from "fs";
import glob from "glob";

import {
  htmlContentSelector,
  metadataSelector
} from "../../modules/page-article/page-article.selector";
import { Article } from "./article.entity";
import { optimizeImage, toAbsolutePaths, toTitleCase } from "./article.util";

const articlesDir = path.join(process.cwd(), "articles");
const publicDir = path.join(process.cwd(), "public");

export const getArticleBySlug = (slug: string): Article => {
  const articleDir = path.join(articlesDir, slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const articleImagesGlob = path.join(articleDir, "**/*.{jpeg,jpg,png,gif}");
  const basePath = path.join("/article", slug);
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
    slug,
    htmlContent,
    metadata
  };
};

export const getArticles = async (): Promise<Article[]> => {
  const items = await fs.readdir(articlesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return folders.map(({ name }) => {
    const slug = path.parse(name).name;

    return getArticleBySlug(slug);
  });
};

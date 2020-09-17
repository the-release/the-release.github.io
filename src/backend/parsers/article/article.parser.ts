import path from "path";
import { promises as fs } from "fs";
import cheerio from "cheerio";
import readingTime from "reading-time";

import {
  coverImageSelector,
  coverImageUrlSelector,
  descriptionSelector,
  htmlContentSelector,
  metadataSelector,
  plainTextSelector,
  titleSelector
} from "./article.selector";
import { exportThumbnail, exportImages, externalLinks } from "./article.util";
import { ORIGIN } from "../../../config";

const articlesDir = path.join(process.cwd(), "data", "articles");

export const getArticleBySlug = async (slug: string) => {
  try {
    const isDraft = slug.startsWith(".") ? 1 : 0;
    const articleDir = path.join(articlesDir, slug);
    const articleFilePath = path.join(articleDir, "/article.md");
    const {
      category,
      author,
      publishedAt,
      timestamp,
      keywords
    } = await metadataSelector(articleDir);

    const htmlContent = externalLinks(
      await exportImages(await htmlContentSelector(articleFilePath), slug)
    );

    const $ = cheerio.load(htmlContent);
    const plainText = plainTextSelector($);
    const { src: coverImageSrc, alt: coverImageAlt } = coverImageSelector($);

    return {
      url: `/article/${slug}`,
      absoluteUrl: `${ORIGIN}/article/${slug}`,
      slug,
      htmlContent,
      publishedAt,
      timestamp,
      isDraft,
      keywords,
      title: titleSelector($),
      description: descriptionSelector($),
      readingTime: readingTime(plainText).text,
      coverImageUrl: coverImageUrlSelector(coverImageSrc),
      coverImageAlt,
      thumbnail: await exportThumbnail(coverImageSrc),
      category,
      author
    };
  } catch (err) {
    console.error(
      "Error:",
      err?.message || "An unexpected error occurred while parsing the article"
    );
    console.error(`Article: ${slug}`);
    process.exit(1);
  }
};

export const getArticles = async () => {
  const items = await fs.readdir(articlesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await getArticleBySlug(slug);
    })
  );
};

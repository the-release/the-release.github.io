import path from "path";
import { promises as fs } from "fs";
import cheerio from "cheerio";
import readingTime from "reading-time";

import {
  coverImageSelector,
  coverImageUrlSelector,
  descriptionSelector,
  metadataSelector,
  plainTextSelector,
  titleSelector
} from "./article.selector";
import {
  exportThumbnail,
  exportImages,
  externalLinks,
  addImageCaptions,
  enforceImageAltTags
} from "./article.util";
import { ORIGIN } from "../../../config";
import { parseMarkDown } from "../markdown/markdown.parser";

const articlesDir = path.join(process.cwd(), "data", "articles");

export const getArticleBySlug = async (slug: string) => {
  try {
    const isDraft = slug.startsWith(".") ? 1 : 0;
    const articleDir = path.join(articlesDir, slug);
    const articleFilePath = path.join(articleDir, "/article.md");
    const metadata = await metadataSelector(articleDir);

    const htmlContent = enforceImageAltTags(
      externalLinks(
        addImageCaptions(
          await exportImages(await parseMarkDown(articleFilePath), slug)
        )
      )
    );

    const $ = cheerio.load(htmlContent);
    const plainText = plainTextSelector($);
    const { src: coverImageSrc, alt: coverImageAlt } = coverImageSelector($);

    return {
      url: `/article/${slug}`,
      absoluteUrl: `${ORIGIN}/article/${slug}`,
      slug,
      htmlContent,
      publishedAt: metadata.publishedAt,
      timestamp: metadata.timestamp,
      isDraft,
      keywords: metadata.keywords,
      title: titleSelector($),
      description: descriptionSelector($),
      readingTime: readingTime(plainText).text,
      coverImageUrl: coverImageUrlSelector(coverImageSrc),
      coverImageAlt,
      thumbnail: await exportThumbnail(coverImageSrc),
      category: metadata.category,
      author: metadata.author
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

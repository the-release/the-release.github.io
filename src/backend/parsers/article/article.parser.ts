import path from "path";
import { promises as fs } from "fs";

import {
  ledeSelector,
  metadataSelector,
  readingTimeSelector,
  titleSelector
} from "./article.selector";
import { ORIGIN } from "../../../config";
import { parseMarkDown } from "../../utils/markdown";
import { coverImageLinter, enforceImageCaptions } from "./article.linter";
import { exportImages } from "../../utils/image-export";
import { addImageCaptions } from "../../utils/image-caption";
import { lazyLoadImages } from "../../utils/image-lazy-load";
import { makeImageResponsive } from "../../utils/image-responsive";

const articlesDir = path.join(process.cwd(), "data", "articles");

const parseArticle = async (slug: string) => {
  try {
    const isDraft = slug.startsWith(".") ? 1 : 0;
    const articleDir = path.join(articlesDir, slug);
    const articleFilePath = path.join(articleDir, "/article.md");
    const metadata = await metadataSelector(articleDir);
    let htmlContent = await parseMarkDown(articleFilePath);

    const { html, images } = await exportImages(htmlContent, articleDir);

    coverImageLinter(html);
    enforceImageCaptions(html);

    htmlContent = addImageCaptions(html);
    htmlContent = lazyLoadImages(htmlContent);
    htmlContent = makeImageResponsive(htmlContent);

    return {
      url: `/article/${slug}`,
      absoluteUrl: `${ORIGIN}/article/${slug}`,
      slug,
      htmlContent,
      publishedAt: metadata.publishedAt,
      timestamp: metadata.timestamp,
      isDraft,
      keywords: metadata.keywords,
      title: titleSelector(htmlContent),
      lede: ledeSelector(htmlContent),
      images,
      readingTime: readingTimeSelector(htmlContent),
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

export const parseArticles = async () => {
  const items = await fs.readdir(articlesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await parseArticle(slug);
    })
  );
};

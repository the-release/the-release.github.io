import path from "path";

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
import { glob } from "../../utils/glob";

const articlesDir = path.join(process.cwd(), "data", "articles");

const parseArticle = async (filePath: string) => {
  const { dir: slug } = path.parse(filePath);
  const fullPath = path.join(articlesDir, filePath);
  const basePath = path.join(articlesDir, slug);

  try {
    const isDraft = slug.startsWith(".") ? 1 : 0;
    const metadata = await metadataSelector(basePath);
    let htmlContent = await parseMarkDown(fullPath);

    const {
      html,
      images: [coverImage]
    } = await exportImages(htmlContent, basePath);

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
      coverImage,
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
  const files = await glob(`**/article.md`, {
    cwd: articlesDir
  });

  return await Promise.all(
    files.map(async filePath => await parseArticle(filePath))
  );
};

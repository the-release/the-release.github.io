import path from "path";
import { promises as fs } from "fs";

import {
  coverImageSelector,
  descriptionSelector,
  metadataSelector,
  readingTimeSelector,
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

    const {
      url: coverImageUrl,
      src: coverImageSrc,
      alt: coverImageAlt
    } = coverImageSelector(htmlContent);

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
      description: descriptionSelector(htmlContent),
      readingTime: readingTimeSelector(htmlContent),
      coverImageUrl,
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

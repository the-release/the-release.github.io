import path from "path";
import { promises as fs } from "fs";

import {
  coverImageAltSelector,
  ledeSelector,
  metadataSelector,
  readingTimeSelector,
  titleSelector
} from "./article.selector";
import {
  exportImages,
  externalLinks,
  addImageCaptions,
  lazyLoadImages,
  makeImageResponsive
} from "./article.util";
import { ORIGIN } from "../../../config";
import { parseMarkDown } from "../markdown/markdown.parser";
import { coverImageLinter } from "./article.linter";

const articlesDir = path.join(process.cwd(), "data", "articles");

export const getArticleBySlug = async (slug: string) => {
  try {
    const isDraft = slug.startsWith(".") ? 1 : 0;
    const articleDir = path.join(articlesDir, slug);
    const articleFilePath = path.join(articleDir, "/article.md");
    const metadata = await metadataSelector(articleDir);
    let htmlContent = await parseMarkDown(articleFilePath);

    const { html, images } = await exportImages(htmlContent, slug);
    const [coverImage] = images;

    coverImageLinter(html);

    htmlContent = addImageCaptions(html);
    htmlContent = lazyLoadImages(htmlContent);
    htmlContent = externalLinks(htmlContent);
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
      coverImageUrl: coverImage.sizes.large.absoluteUrl,
      coverImageAlt: coverImageAltSelector(htmlContent),
      thumbnailUrl: coverImage.sizes.small.url,
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

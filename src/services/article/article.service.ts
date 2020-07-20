import path from "path";
import { promises as fs } from "fs";
import cheerio from "cheerio";

import {
  coverImageUrlSelector,
  creationDateSelector,
  descriptionSelector,
  htmlContentSelector,
  imagesSelector,
  timestampSelector,
  titleSelector
} from "./article.selector";
import { Article } from "./article.entity";
import {
  generateThumbnail,
  isAbsoluteUrl,
  optimizeImage,
  toAbsolutePaths,
  toTitleCase
} from "./article.util";
import { getCategoryBySlug } from "../category/category.service";

const articlesDir = path.join(process.cwd(), "data", "articles");
const publicDir = path.join(process.cwd(), "public");

const exportImages = async (images: string[]) => {
  let thumbnailPath: string | null = null;

  for (const [index, image] of images.entries()) {
    // TODO: disallow external images
    if (isAbsoluteUrl(image)) continue;

    const src = path.join(articlesDir, image.replace(/^\/article/, ""));
    const dest = path.join(publicDir, image);
    const { dir, name, ext } = path.parse(image);

    if (index === 0) {
      thumbnailPath = path.join(dir, `${name}.thumb${ext}`);
    }

    if ((await fs.stat(dest).catch(() => undefined))?.isFile()) continue;

    await optimizeImage(src, dest);

    if (index === 0) {
      const thumbDest = path.join(publicDir, dir, `${name}.thumb${ext}`);

      await generateThumbnail(src, thumbDest);
    }
  }

  return thumbnailPath;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const articleDir = path.join(articlesDir, slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const basePath = path.join("/article", slug);
  const htmlContent = toTitleCase(
    toAbsolutePaths(htmlContentSelector(articleFilePath), basePath)
  );
  const categoryFilePath = path.join(articleDir, "/category.txt");
  const categorySlug = (await fs.readFile(categoryFilePath, "utf8")).trim();
  const category = await getCategoryBySlug(categorySlug);
  const $ = cheerio.load(htmlContent);
  const images = imagesSelector($);
  const thumbnail = await exportImages(images);
  const coverImageUrl = coverImageUrlSelector($);

  if (!coverImageUrl || !thumbnail) {
    throw new Error(`Missing cover image for article /${slug}`);
  }

  return {
    slug,
    htmlContent,
    creationDate: creationDateSelector(articleFilePath),
    timestamp: timestampSelector(articleFilePath),
    title: titleSelector($),
    description: descriptionSelector($),
    coverImageUrl,
    thumbnail,
    category
  };
};

export const getArticlesByCategorySlug = async (
  slug: string
): Promise<Article[]> => {
  const articles = await getArticles();

  return articles.filter(article => {
    return article.category.slug === slug;
  });
};

export const getArticles = async (): Promise<Article[]> => {
  const items = await fs.readdir(articlesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());
  const articles = await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await getArticleBySlug(slug);
    })
  );

  return articles.sort((x, y) => {
    return x.timestamp - y.timestamp;
  });
};

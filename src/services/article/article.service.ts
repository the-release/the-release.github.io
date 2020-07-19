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
  let thumbnailPath: string | null = null;

  for (const [index, image] of images.entries()) {
    if (isAbsoluteUrl(image)) continue;

    const src = path.join(articlesDir, image.replace(/^\/article/, ""));
    const dest = path.join(publicDir, image);
    const { dir, name, ext } = path.parse(image);

    await optimizeImage(src, dest);

    if (index === 0) {
      thumbnailPath = `${dir}/${name}.thumb${ext}`;

      const thumbDest = path.join(publicDir, thumbnailPath);

      await generateThumbnail(src, thumbDest);
    }
  }

  return {
    slug,
    htmlContent,
    creationDate: creationDateSelector(articleFilePath),
    timestamp: timestampSelector(articleFilePath),
    title: titleSelector($),
    description: descriptionSelector($),
    coverImageUrl: coverImageUrlSelector($),
    thumbnail: thumbnailPath,
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

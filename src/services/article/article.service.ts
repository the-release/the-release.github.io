import path from "path";
import { promises as fs } from "fs";
import cheerio from "cheerio";
import readingTime from "reading-time";

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
import { exportImages, toAbsolutePaths, toTitleCase } from "./article.util";
import { getCategoryBySlug } from "../category/category.service";
import { getAuthorBySlug } from "../author/author.service";
import { ORIGIN } from "../../config";
import { pick } from "../../utils/pick/pick";

const articlesDir = path.join(process.cwd(), "data", "articles");

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const articleDir = path.join(articlesDir, slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const basePath = path.join("/article", slug);
  const htmlContent = toTitleCase(
    toAbsolutePaths(htmlContentSelector(articleFilePath), basePath)
  );
  const metadataFilePath = path.join(articleDir, "/metadata.json");
  const metadata = JSON.parse(await fs.readFile(metadataFilePath, "utf8"));
  const category = await getCategoryBySlug(metadata.category);
  const author = await getAuthorBySlug(metadata.author);
  const $ = cheerio.load(htmlContent);
  const plainText = $.root().text();
  const images = imagesSelector($);
  const thumbnail = await exportImages(images);
  const coverImageUrl = coverImageUrlSelector($);

  if (!coverImageUrl || !thumbnail) {
    throw new Error(`Missing cover image for article /${slug}`);
  }

  return {
    url: `${ORIGIN}/article/${slug}`,
    slug,
    htmlContent,
    creationDate: creationDateSelector(articleFilePath),
    timestamp: timestampSelector(articleFilePath),
    title: titleSelector($),
    description: descriptionSelector($),
    readingTime: readingTime(plainText).text,
    coverImageUrl,
    thumbnail,
    category,
    author
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

export const getArticlesByAuthorSlug = async (
  slug: string
): Promise<Article[]> => {
  const articles = await getArticles();

  return articles.filter(article => {
    return article.author.slug === slug;
  });
};

export const getArticles = async <U extends keyof Article>(
  props?: Array<U>
) => {
  const items = await fs.readdir(articlesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());
  const articles = await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await getArticleBySlug(slug);
    })
  );

  const sortedArticles = articles.sort((x, y) => {
    return x.timestamp - y.timestamp;
  });

  if (!props) return sortedArticles;

  return sortedArticles.map(article => pick(article, props));
};

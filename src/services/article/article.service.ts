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
  metadataSelector,
  plainTextSelector,
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

export const getArticleBySlug = async <U extends keyof Article>(
  slug: string,
  props?: Array<U>
) => {
  const articleDir = path.join(articlesDir, slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const htmlContent = toTitleCase(
    toAbsolutePaths(await htmlContentSelector(articleFilePath), slug)
  );
  const metadata = await metadataSelector(articleDir);
  const category = await getCategoryBySlug(metadata.category);
  const author = await getAuthorBySlug(metadata.author);

  const $ = cheerio.load(htmlContent);
  const plainText = plainTextSelector($);
  const images = imagesSelector($);
  const coverImageUrl = coverImageUrlSelector($);

  const thumbnail = await exportImages(images);

  if (!coverImageUrl || !thumbnail) {
    throw new Error(`Missing cover image for article /${slug}`);
  }

  const article: Article = {
    url: `${ORIGIN}/article/${slug}`,
    slug,
    htmlContent,
    creationDate: await creationDateSelector(articleFilePath),
    timestamp: await timestampSelector(articleFilePath),
    title: titleSelector($),
    description: descriptionSelector($),
    readingTime: readingTime(plainText).text,
    coverImageUrl,
    thumbnail,
    category,
    author
  };

  if (!props) return article;

  return pick(article, props);
};

export const getArticlesByCategorySlug = async <U extends keyof Article>(
  slug: string,
  props?: Array<U>
) => {
  const articles = await getArticles();
  const filteredArticles = articles.filter(article => {
    return article.category.slug === slug;
  });

  if (!props) return filteredArticles;

  return filteredArticles.map(article => pick(article, props));
};

export const getArticlesByAuthorSlug = async <U extends keyof Article>(
  slug: string,
  props?: Array<U>
) => {
  const articles = await getArticles();
  const filteredArticles = articles.filter(article => {
    return article.author.slug === slug;
  });

  if (!props) return filteredArticles;

  return filteredArticles.map(article => pick(article, props));
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

import path from "path";
import { promises as fs } from "fs";
import cheerio from "cheerio";
import readingTime from "reading-time";

import {
  coverImageSelector,
  coverImageUrlSelector,
  creationDateSelector,
  descriptionSelector,
  htmlContentSelector,
  metadataSelector,
  plainTextSelector,
  timestampSelector,
  titleSelector
} from "./article.selector";
import { Article } from "../../../entities/article.entity";
import {
  exportThumbnail,
  exportImages,
  toTitleCase,
  externalLinks
} from "./article.util";
import { ORIGIN } from "../../../config";
import { pick } from "../../../utils/pick/pick";

const articlesDir = path.join(process.cwd(), "data", "articles");

export const getArticleBySlug = async <U extends keyof Article>(
  slug: string,
  props?: Array<U>
) => {
  const articleDir = path.join(articlesDir, slug);
  const articleFilePath = path.join(articleDir, "/article.md");
  const { category, author } = await metadataSelector(articleDir);
  const htmlContent = externalLinks(
    toTitleCase(
      await exportImages(await htmlContentSelector(articleFilePath), slug)
    )
  );

  const $ = cheerio.load(htmlContent);
  const plainText = plainTextSelector($);
  const { src: coverImageSrc, alt: coverImageAlt } = coverImageSelector($);
  const coverImageUrl = coverImageUrlSelector(coverImageSrc);
  const thumbnail = await exportThumbnail(coverImageSrc);

  const article = {
    url: `/article/${slug}`,
    absoluteUrl: `${ORIGIN}/article/${slug}`,
    slug,
    htmlContent,
    creationDate: await creationDateSelector(articleFilePath),
    timestamp: await timestampSelector(articleFilePath),
    title: titleSelector($),
    description: descriptionSelector($),
    readingTime: readingTime(plainText).text,
    coverImageUrl,
    coverImageAlt,
    thumbnail,
    category,
    author
  };

  if (!props) return article;

  return pick(article, props);
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

import path from "path";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import { getRepository } from "typeorm";

import { ORIGIN } from "../config";
import { Article } from "../entities/article.entity";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { dbConnection } from "../fs-to-db/db";

const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

// TODO: add proper last modification value
const articleEntry = (article: Article) => {
  const articleUrl = `${ORIGIN}/article/${article.slug}`;

  return `  <url>
    <loc>${articleUrl}</loc>
    <lastmod>2020-05-04T14:26:06+00:00</lastmod>
    <priority>0.60</priority>
  </url>`;
};

const categoryEntry = (category: Category) => {
  const categoryUrl = `${ORIGIN}/category/${category.slug}`;

  return `  <url>
    <loc>${categoryUrl}</loc>
    <lastmod>2020-05-04T14:26:06+00:00</lastmod>
    <priority>0.60</priority>
  </url>`;
};

const authorEntry = (author: Author) => {
  const authorUrl = `${ORIGIN}/author/${author.slug}`;

  return `  <url>
    <loc>${authorUrl}</loc>
    <lastmod>2020-05-04T14:26:06+00:00</lastmod>
    <priority>0.60</priority>
  </url>`;
};

export const getStaticProps: GetStaticProps = async () => {
  await dbConnection();

  const categories = await getRepository(Category).find();
  const authors = await getRepository(Author).find();
  const articles = await getRepository(Article).find();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;

  xml += `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${ORIGIN}</loc>
    <lastmod>2020-05-04T14:26:06+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${ORIGIN}/about</loc>
    <priority>0.80</priority>
  </url>
  ${articles.map(articleEntry).join("\n")}
  ${categories.map(categoryEntry).join("\n")}
  ${authors.map(authorEntry).join("\n")}
</urlset>`;

  await fs.writeFile(sitemapPath, xml, {
    encoding: "utf8"
  });

  return {
    props: {}
  };
};

export default () => {
  return "done";
};

import path from "path";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";

import { ORIGIN } from "../config";
import { Article } from "../entities/article.entity";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { getArticles } from "../services/article.service";
import { getCategories } from "../services/category.service";
import { getAuthors } from "../services/author.service";

const siteMapPath = path.join(process.cwd(), "public", "sitemap.xml");

const articleEntry = (article: Pick<Article, "absoluteUrl">) => {
  return `  <url>
    <loc>${article.absoluteUrl}</loc>
  </url>`;
};

const categoryEntry = (category: Pick<Category, "absoluteUrl">) => {
  return `  <url>
    <loc>${category.absoluteUrl}</loc>
  </url>`;
};

const authorEntry = (author: Pick<Author, "absoluteUrl">) => {
  return `  <url>
    <loc>${author.absoluteUrl}</loc>
  </url>`;
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles({
    props: ["absoluteUrl"]
  });

  const categories = await getCategories({
    props: ["absoluteUrl"]
  });

  const authors = await getAuthors({
    props: ["absoluteUrl"]
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;

  xml += `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${ORIGIN}</loc>
  </url>
  ${articles.map(articleEntry).join("\n")}
  ${categories.map(categoryEntry).join("\n")}
  ${authors.map(authorEntry).join("\n")}
</urlset>`;

  await fs.writeFile(siteMapPath, xml, {
    encoding: "utf8"
  });

  return {
    props: {}
  };
};

const SiteMap = () => {
  return "done";
};

export default SiteMap;

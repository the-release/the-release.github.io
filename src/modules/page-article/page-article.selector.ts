import cheerio from "cheerio";
import fs from "fs";
import { ArticleMetadata } from "./page-article";
import marked from "marked";

export const metadataSelector = (
  html: string,
  filePath: string
): ArticleMetadata => {
  const $ = cheerio.load(html);

  return {
    title: titleSelector($),
    description: descriptionSelector($),
    image: imageSelector($),
    creationDate: creationDateSelector(filePath)
  };
};

const titleSelector = ($: CheerioStatic) => {
  return $("h1")
    .first()
    .text();
};

const descriptionSelector = ($: CheerioStatic) => {
  return $("p")
    .first()
    .text();
};

const imageSelector = ($: CheerioStatic) => {
  const src = $("img")
    .first()
    .attr("src");

  return `https://google.com${src}`;
};

const creationDateSelector = (filePath: string) => {
  const stats = fs.statSync(filePath);

  return `${stats.birthtime}`;
};

export const htmlContentSelector = (filePath: string) => {
  const fileContents = fs.readFileSync(filePath, "utf8").trim();

  return marked(fileContents);
};

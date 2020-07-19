import cheerio from "cheerio";
import fs from "fs";
import marked from "marked";
import { format } from "date-fns";
import { ArticleMetadata } from "./page-article";

export const metadataSelector = (
  html: string,
  filePath: string
): ArticleMetadata => {
  const $ = cheerio.load(html);

  return {
    title: titleSelector($),
    description: descriptionSelector($),
    coverImageUrl: coverImageUrlSelector($),
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

const coverImageUrlSelector = ($: CheerioStatic) => {
  const src = $("img")
    .first()
    .attr("src");

  return `https://google.com${src}`;
};

const creationDateSelector = (filePath: string) => {
  const stats = fs.statSync(filePath);

  return format(stats.birthtime, "MMMM dd, yyyy h:mm a");
};

export const htmlContentSelector = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf8").trim();

  return marked(markdown);
};

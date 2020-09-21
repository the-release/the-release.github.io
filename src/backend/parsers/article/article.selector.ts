import { promises as fs } from "fs";

import { format } from "date-fns";
import path from "path";
import titleCase from "title";
import cheerio from "cheerio";
import readingTime from "reading-time";

export const titleSelector = (html: string) => {
  const $ = cheerio.load(html);
  const titleElement = $("body > h1:first-child");

  if (!titleElement.length) throw new Error("Missing title");

  return titleElement.text();
};

export const ledeSelector = (html: string) => {
  const $ = cheerio.load(html);
  const ledeElement = $("body > h1:first-child + p > strong:only-child");

  if (!ledeElement.length) throw new Error("Missing lede");

  return ledeElement.text();
};

const plainTextSelector = (html: string) => {
  const $ = cheerio.load(html);

  return $("body").text();
};

export const readingTimeSelector = (html: string) => {
  const plainText = plainTextSelector(html);

  return readingTime(plainText).text;
};

export const metadataSelector = async (
  articleDir: string
): Promise<{
  category: string;
  author: string;
  publishedAt: string;
  timestamp: number;
  keywords: string;
}> => {
  const metadataFilePath = path.join(articleDir, "/metadata.json");
  const metadata = JSON.parse(await fs.readFile(metadataFilePath, "utf8"));

  if (!metadata.category?.trim()) throw new Error(`Missing category metadata`);
  if (!metadata.author?.trim()) throw new Error(`Missing author metadata`);
  if (!metadata.keywords?.trim()) throw new Error(`Missing keywords metadata`);
  if (!metadata.publishedAt?.trim()) {
    throw new Error(`Missing publishedAt metadata`);
  }

  const date = new Date(metadata.publishedAt);
  const publishedAt = format(date, "MMMM dd, yyyy h:mm a");
  const timestamp = +date;
  const keywords = metadata.keywords
    .split(",")
    .map((keyword: string) => titleCase(keyword.trim()))
    .join(", ");

  return {
    ...metadata,
    publishedAt,
    timestamp,
    keywords
  };
};

import { promises as fs } from "fs";
import marked from "marked";
import { format } from "date-fns";
import url from "url";
import path from "path";

import { ORIGIN } from "../../config";

export const titleSelector = ($: CheerioStatic) => {
  return $("h1")
    .first()
    .text();
};

export const descriptionSelector = ($: CheerioStatic) => {
  return $("p")
    .first()
    .text();
};

export const plainTextSelector = ($: CheerioStatic) => {
  return $.root().text();
};

export const coverImageUrlSelector = (imagePath: string) => {
  return url.resolve(ORIGIN, imagePath || "");
};

export const coverImageSelector = ($: CheerioStatic) => {
  const coverImage = $("img").first();

  return {
    src: coverImage.attr("src"),
    alt: coverImage.attr("alt")
  };
};

export const timestampSelector = async (filePath: string) => {
  const stats = await fs.stat(filePath);

  return stats.birthtimeMs;
};

export const creationDateSelector = async (filePath: string) => {
  const stats = await fs.stat(filePath);

  return format(stats.birthtime, "MMMM dd, yyyy h:mm a");
};

export const htmlContentSelector = async (filePath: string) => {
  const markdown = (await fs.readFile(filePath, "utf8")).trim();

  return marked(markdown);
};

export const metadataSelector = async (articleDir: string) => {
  const metadataFilePath = path.join(articleDir, "/metadata.json");

  return JSON.parse(await fs.readFile(metadataFilePath, "utf8"));
};

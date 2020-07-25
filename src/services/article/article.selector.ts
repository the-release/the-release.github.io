import { promises as fs } from "fs";
import marked from "marked";
import { format } from "date-fns";
import url from "url";

import { ORIGIN } from "../../config";
import path from "path";

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

export const coverImageUrlSelector = ($: CheerioStatic) => {
  const src = $("img")
    .first()
    .attr("src");

  if (!src) return null;

  return url.resolve(ORIGIN, src || "");
};

export const imagesSelector = ($: CheerioStatic) => {
  const images: string[] = [];

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");

    if (!src) return;

    images.push(src);
  });

  return images;
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

import fs from "fs";
import marked from "marked";
import { format } from "date-fns";
import url from "url";

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

export const timestampSelector = (filePath: string) => {
  const stats = fs.statSync(filePath);

  return stats.birthtimeMs;
};

export const creationDateSelector = (filePath: string) => {
  const stats = fs.statSync(filePath);

  return format(stats.birthtime, "MMMM dd, yyyy h:mm a");
};

export const htmlContentSelector = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf8").trim();

  return marked(markdown);
};

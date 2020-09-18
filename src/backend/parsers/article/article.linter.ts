import cheerio from "cheerio";

import { LARGE_IMAGE_WIDTH } from "../../../config";

export const coverImageLinter = (html: string) => {
  const $ = cheerio.load(html);
  const coverImage = $("body > h1:first-child + p + p img");
  const src = coverImage.attr("src");
  const width = parseInt(coverImage.attr("width") || "0", 10);

  if (!src) throw new Error(`Missing cover image`);
  if (width < LARGE_IMAGE_WIDTH) {
    throw new Error(`Cover image must be at least ${LARGE_IMAGE_WIDTH}px wide`);
  }
};

export const imageAltLinter = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");
    const alt = $(elem).attr("alt");

    if (!alt?.trim()) {
      throw new Error(`Missing image alt tag \nImage source: ${src}`);
    }
  });
};

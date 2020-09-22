import cheerio from "cheerio";

import { COVER_IMAGE_MIN_WIDTH } from "../../../config";

export const coverImageLinter = (html: string) => {
  const $ = cheerio.load(html);
  const coverImage = $("body > h1:first-child + p + p img");
  const src = coverImage.attr("src");
  const width = parseInt(coverImage.attr("width") || "0", 10);

  if (!src) throw new Error(`Missing cover image`);
  if (width < COVER_IMAGE_MIN_WIDTH) {
    throw new Error(
      `Cover image must be at least ${COVER_IMAGE_MIN_WIDTH}px wide`
    );
  }
};

export const enforceImageCaptions = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");
    const captionElem = $(elem).nextAll("em, br + em");

    if (!$(captionElem).length) {
      throw new Error(
        `Images must be followed by a caption \nImage source: ${src}`
      );
    }
  });
};

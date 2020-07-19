import cheerio from "cheerio";
import path from "path";
import { titleCase } from "title-case";
import jimp from "jimp";

const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

export const toAbsolutePaths = (html: string, basePath: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src") || "";

    if (!isAbsoluteUrl(src)) {
      $(elem).attr("src", path.join(basePath, src));
    }
  });

  return $.html();
};

export const toTitleCase = (html: string) => {
  const $ = cheerio.load(html);

  $("h1,h2,h3,h4,h5,h6").each((index, elem) => {
    const title = $(elem).text();

    $(elem).text(titleCase(title));
  });

  return $.html();
};

export const optimizeImage = async (imagePath: string) => {
  const image = await jimp.read(imagePath);

  if (image.getWidth() > 960) {
    await image.resize(960, jimp.AUTO);
  }

  await image.quality(50);
  await image.writeAsync(imagePath);
};

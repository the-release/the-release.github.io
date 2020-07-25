import cheerio from "cheerio";
import path from "path";
import { titleCase } from "title-case";
import jimp from "jimp";
import { promises as fs } from "fs";

export const isAbsoluteUrl = (url: string) => {
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

const optimizeImage = async (src: string, dest: string) => {
  const image = await jimp.read(src);

  if (image.getWidth() > 1920) {
    await image.resize(1920, jimp.AUTO);
  }

  await image.quality(50);
  await image.writeAsync(dest);
};

const generateThumbnail = async (src: string, dest: string) => {
  const image = await jimp.read(src);

  await image.resize(300, jimp.AUTO);
  await image.quality(60);
  await image.writeAsync(dest);
};

// TODO: hash images
export const exportImages = async (images: string[]) => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  let thumbnailPath: string | null = null;

  for (const [index, image] of images.entries()) {
    // TODO: disallow external images
    if (isAbsoluteUrl(image)) continue;

    const src = path.join(articlesDir, image.replace(/^\/article/, ""));
    const dest = path.join(publicDir, image);
    const { dir, name, ext } = path.parse(image);

    if (index === 0) {
      thumbnailPath = path.join(dir, `${name}.thumb${ext}`);
    }

    if ((await fs.stat(dest).catch(() => undefined))?.isFile()) continue;

    await optimizeImage(src, dest);

    if (index === 0) {
      const thumbDest = path.join(publicDir, dir, `${name}.thumb${ext}`);

      await generateThumbnail(src, thumbDest);
    }
  }

  return thumbnailPath;
};

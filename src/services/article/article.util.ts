import cheerio from "cheerio";
import path from "path";
import { titleCase } from "title-case";
import jimp from "jimp";
import { promises as fs } from "fs";
import { sha256 } from "../../utils/sha256/sha256";

export const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

export const exportImages = async (html: string, slug: string) => {
  const $ = cheerio.load(html);
  const basePath = path.join("/article", slug);
  const absolutePaths: string[] = [];
  const exportedPaths: string[] = [];
  const images = $("img");

  images.each((index, elem) => {
    const src = $(elem).attr("src");

    if (!src) return;

    if (isAbsoluteUrl(src)) {
      throw new Error("Absolute URLs are not allowed for images");
    }

    absolutePaths.push(path.join(basePath, src));
  });

  for (const absolutePath of absolutePaths) {
    exportedPaths.push(await exportImage(absolutePath));
  }

  images.each((index, elem) => {
    $(elem).attr("src", exportedPaths[index]);
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

const isFile = async (path: string) => {
  return (await fs.stat(path).catch(() => undefined))?.isFile();
};

export const exportThumbnail = async (imagePath: string) => {
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(publicDir, imagePath);
  const { dir, name, ext } = path.parse(imagePath);
  const dest = path.join(publicDir, dir, `${name}.thumb${ext}`);
  const newPath = path.join(dir, `${name}.thumb${ext}`);

  if (await isFile(dest)) return newPath;

  await generateThumbnail(src, dest);

  return newPath;
};

export const exportImage = async (absolutePath: string) => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(articlesDir, absolutePath.replace(/^\/article/, ""));
  const hash = sha256(await fs.readFile(src));
  const { dir, name, ext } = path.parse(absolutePath);
  const newPath = path.join(dir, `${name}.${hash}${ext}`);
  const dest = path.join(publicDir, newPath);

  if (await isFile(dest)) return newPath;

  await optimizeImage(src, dest);

  return newPath;
};

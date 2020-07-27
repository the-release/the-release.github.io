import cheerio from "cheerio";
import path from "path";
import { titleCase } from "title-case";
import jimp from "jimp";
import { promises as fs } from "fs";
import { sha256 } from "../../utils/sha256/sha256";
import { isFile } from "../../utils/is-file/is-file";
import { ORIGIN } from "../../config";

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

    if (!src) throw new Error("Missing image URL");

    if (isAbsoluteUrl(src)) {
      throw new Error("Image URLs should not be absolute");
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

export const externalLinks = (html: string) => {
  const $ = cheerio.load(html);

  $("a").each((index, elem) => {
    const href = $(elem).attr("href");

    if (!href) throw new Error("empty link");
    if (!isAbsoluteUrl(href)) return;
    if (href.startsWith(ORIGIN)) {
      throw new Error("Internal links should not be absolute");
    }

    $(elem).attr("target", "_blank");
    $(elem).attr("rel", "noopener noreferrer");
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

const exportImage = async (absolutePath: string) => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(articlesDir, absolutePath.replace(/^\/article/, ""));
  const hash = sha256(await fs.readFile(src));
  const { dir, name, ext } = path.parse(absolutePath);
  const newPath = path.join(dir, `${name}-${hash}${ext}`);
  const dest = path.join(publicDir, newPath);

  if (await isFile(dest)) return newPath;

  await optimizeImage(src, dest);

  return newPath;
};

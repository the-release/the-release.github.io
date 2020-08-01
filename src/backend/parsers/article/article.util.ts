import cheerio from "cheerio";
import path from "path";
import { titleCase } from "title-case";
import sharp from "sharp";

import { promises as fs } from "fs";
import { sha256 } from "../../../utils/sha256/sha256";
import { isFile } from "../../../utils/is-file/is-file";
import { ORIGIN } from "../../../config";
import { resizeImage } from "../../../utils/resize-image/resize-image";

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
    wrapWithCaption($, elem);
  });

  return $.html();
};

const wrapWithCaption = ($: CheerioStatic, elem: CheerioElement) => {
  const captionElem = $(elem).next("em");

  if (!$(captionElem).length) return;

  const caption = $(captionElem).html();

  $(elem).wrap("<figure></figure>");
  $(elem)
    .parent()
    .append(`<figcaption>${caption}</figcaption>`);
  $(captionElem).remove();
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
  const { info } = await sharp(src).toBuffer({ resolveWithObject: true });

  if (info.width <= 1920) {
    return await resizeImage({
      src,
      dest,
      quality: 50
    });
  }

  return resizeImage({
    src,
    dest,
    width: 1920,
    quality: 50
  });
};

const generateThumbnail = async (src: string, dest: string) => {
  return resizeImage({
    src,
    dest,
    width: 300,
    quality: 60
  });
};

export const exportThumbnail = async (imagePath: string) => {
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(publicDir, imagePath);
  const { dir, name } = path.parse(imagePath);
  const dest = path.join(publicDir, dir, `${name}.thumb.jpg`);
  const newPath = path.join(dir, `${name}.thumb.jpg`);

  if (await isFile(dest)) return newPath;

  await generateThumbnail(src, dest);

  return newPath;
};

const exportImage = async (absolutePath: string) => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(articlesDir, absolutePath.replace(/^\/article/, ""));
  const hash = sha256(await fs.readFile(src));
  const { dir, name } = path.parse(absolutePath);
  const newPath = path.join(dir, `${name}-${hash}.jpg`);
  const dest = path.join(publicDir, newPath);

  if (await isFile(dest)) return newPath;

  await optimizeImage(src, dest);

  return newPath;
};

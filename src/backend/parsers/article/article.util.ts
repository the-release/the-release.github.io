import cheerio from "cheerio";
import path from "path";
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
  const imageElements: CheerioElement[] = [];

  $("img").each((index, elem) => imageElements.push(elem));

  for (const imageElement of imageElements) {
    const src = $(imageElement).attr("src");

    if (!src) throw new Error("Missing image URL");

    if (isAbsoluteUrl(src)) {
      throw new Error("Image URLs should not be absolute");
    }

    const absolutePath = path.join(basePath, src);
    const { exportPath, width, height } = await exportImage(absolutePath);

    $(imageElement)
      .attr("src", exportPath)
      .attr("width", `${width}`)
      .attr("height", `${height}`);
  }

  return $.html();
};

export const enforceImageAltTags = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");
    const alt = $(elem).attr("alt");

    if (!alt?.trim()) {
      throw new Error(`Missing image alt tag \nImage source: ${src}`);
    }
  });

  return $.html();
};

export const addImageCaptions = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");
    const captionElem = $(elem).next("em");

    if (!$(captionElem).length) {
      throw new Error(
        `Images must be followed by a caption \nImage source: ${src}`
      );
    }

    const caption = $(captionElem).html();

    // Unwrap image from paragraph
    $(elem)
      .parent()
      .replaceWith(elem);

    $(elem).wrap("<figure></figure>");
    $(elem)
      .parent()
      .append(`<figcaption>${caption}</figcaption>`);

    $(captionElem).remove();
  });

  return $.html();
};

export const externalLinks = (html: string) => {
  const $ = cheerio.load(html);

  $("a").each((index, elem) => {
    const href = $(elem).attr("href");

    if (!href) throw new Error("Empty link");
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
  const options = {
    src,
    dest,
    quality: 50
  };

  if (info.width <= 1536) return await resizeImage(options);

  return resizeImage({
    ...options,
    width: 1536
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
  const exportPath = path.join(dir, `${name}.thumb.jpg`);

  if (await isFile(dest)) return exportPath;

  await generateThumbnail(src, dest);

  return exportPath;
};

const exportImage = async (absolutePath: string) => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(articlesDir, absolutePath.replace(/^\/article/, ""));
  const hash = sha256(await fs.readFile(src));
  const { dir, name } = path.parse(absolutePath);
  const exportPath = path.join(dir, `${name}-${hash}.jpg`);
  const dest = path.join(publicDir, exportPath);

  if (await isFile(dest)) {
    const { info } = await sharp(dest).toBuffer({
      resolveWithObject: true
    });

    return {
      width: info.width,
      height: info.height,
      exportPath
    };
  }

  const { width, height } = await optimizeImage(src, dest);

  return {
    width,
    height,
    exportPath
  };
};

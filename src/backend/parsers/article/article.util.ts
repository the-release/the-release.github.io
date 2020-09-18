import cheerio from "cheerio";
import path from "path";
import sharp from "sharp";

import { promises as fs } from "fs";
import { sha256 } from "../../../utils/sha256/sha256";
import { isFile } from "../../../utils/is-file/is-file";
import {
  SMALL_IMAGE_WIDTH,
  MEDIUM_IMAGE_WIDTH,
  LARGE_IMAGE_WIDTH,
  ORIGIN
} from "../../../config";
import { resizeImage } from "../../../utils/resize-image/resize-image";
import url from "url";

interface ExportedImage {
  small: {
    width: number;
    height: number;
    url: string;
    absoluteUrl: string;
  };
  medium: {
    width: number;
    height: number;
    url: string;
    absoluteUrl: string;
  };
  large: {
    width: number;
    height: number;
    url: string;
    absoluteUrl: string;
  };
}

export const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

export const exportImages = async (html: string, slug: string) => {
  const $ = cheerio.load(html);
  const basePath = path.join("/article", slug);
  const imageElements: CheerioElement[] = [];
  const images: ExportedImage[] = [];

  $("img").each((index, elem) => imageElements.push(elem));

  for (const imageElement of imageElements) {
    const src = $(imageElement).attr("src");

    if (!src) throw new Error("Missing image URL");

    if (isAbsoluteUrl(src)) {
      throw new Error("Image URLs should not be absolute");
    }

    const absolutePath = path.join(basePath, src);
    const exportedImage = await exportImage(absolutePath);
    const { large, medium } = exportedImage;

    images.push(exportedImage);

    $(imageElement)
      .attr("src", medium.url)
      .attr("srcset", `${medium.url} 768w, ${large.url} 1536w`)
      .attr("width", `${large.width}`)
      .attr("height", `${large.height}`);
  }

  return {
    html: $.html(),
    images
  };
};

export const makeImageResponsive = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const width = parseInt($(elem).attr("width") || "0", 10);
    const height = parseInt($(elem).attr("height") || "0", 10);
    const imageRatio = (height / width) * 100;

    $(elem)
      .wrap(`<div style="padding-top: ${imageRatio}%"></div>`)
      .closest("figure")
      .css("max-width", `${width}px`);
  });

  return $.html();
};

export const addImageCaptions = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const src = $(elem).attr("src");
    const captionElem = $(elem).nextAll("em, br + em");

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

    $(elem)
      .wrap(`<figure></figure>`)
      .closest("figure")
      .append(`<figcaption>${caption}</figcaption>`);

    $(captionElem).remove();
  });

  return $.html();
};

export const lazyLoadImages = (html: string) => {
  const $ = cheerio.load(html);

  $("img").attr("loading", "lazy");
  $("body > h1:first-child + p + figure img").attr("loading", "eager");

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

const optimizeImage = async (src: string, dest: string, width: number) => {
  const options = {
    src,
    dest,
    quality: 50
  };

  // Skip optimisation if the file already exists
  if (await isFile(dest)) {
    const { info } = await sharp(dest).toBuffer({
      resolveWithObject: true
    });

    return {
      width: info.width,
      height: info.height
    };
  }

  const { info } = await sharp(src).toBuffer({ resolveWithObject: true });

  if (info.width <= width) {
    return await resizeImage(options);
  }

  return resizeImage({
    ...options,
    width
  });
};

const exportImage = async (absolutePath: string): Promise<ExportedImage> => {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(articlesDir, absolutePath.replace(/^\/article/, ""));
  const hash = sha256(await fs.readFile(src));
  const { dir, name } = path.parse(absolutePath);

  const exportPathSmall = path.join(dir, `${name}-${hash}-small.jpg`);
  const exportPathMedium = path.join(dir, `${name}-${hash}-medium.jpg`);
  const exportPathLarge = path.join(dir, `${name}-${hash}-large.jpg`);

  const destSmall = path.join(publicDir, exportPathSmall);
  const destMedium = path.join(publicDir, exportPathMedium);
  const destLarge = path.join(publicDir, exportPathLarge);

  const absoluteUrlSmall = url.resolve(ORIGIN, exportPathSmall);
  const absoluteUrlMedium = url.resolve(ORIGIN, exportPathMedium);
  const absoluteUrlLarge = url.resolve(ORIGIN, exportPathLarge);

  return {
    small: {
      ...(await optimizeImage(src, destSmall, SMALL_IMAGE_WIDTH)),
      url: exportPathSmall,
      absoluteUrl: absoluteUrlSmall
    },
    medium: {
      ...(await optimizeImage(src, destMedium, MEDIUM_IMAGE_WIDTH)),
      url: exportPathMedium,
      absoluteUrl: absoluteUrlMedium
    },
    large: {
      ...(await optimizeImage(src, destLarge, LARGE_IMAGE_WIDTH)),
      url: exportPathLarge,
      absoluteUrl: absoluteUrlLarge
    }
  };
};

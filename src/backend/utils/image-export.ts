import path from "path";
import { promises as fs } from "fs";
import url from "url";
import ColorThief from "colorthief";
import cheerio from "cheerio";

import { sha256 } from "./sha256";
import { ORIGIN, IMAGE_SIZES } from "../../config";
import { optimizeImage } from "./image-optimization";
import { Image, ImageSizes } from "../../entities/image.entity";
import { isAbsoluteUrl } from "./absolute-url";
import { slugify } from "./slugify";

export const exportImages = async (html: string, basePath: string) => {
  const $ = cheerio.load(html);
  const imageElements: CheerioElement[] = [];
  const images: Image[] = [];

  $("img").each((index, elem) => imageElements.push(elem));

  for (const imageElement of imageElements) {
    const src = $(imageElement).attr("src");
    const alt = $(imageElement).attr("alt");

    if (!src) throw new Error("Missing image URL");
    if (!alt?.trim()) {
      throw new Error(`Missing image alt tag \nImage source: ${src}`);
    }

    if (isAbsoluteUrl(src)) {
      throw new Error("Image URLs should not be absolute");
    }

    const filePath = path.join(basePath, src);
    const exportedImage = await exportImage(filePath, alt);
    const { sizes, dominantColor } = exportedImage;
    const biggestImage = Object.values(sizes).slice(-1)[0];
    const srcSet = Object.values(sizes)
      .map(size => `${size.url} ${size.width}w`)
      .join(", ");

    images.push(exportedImage);

    $(imageElement)
      .attr("src", sizes["800"].url)
      .attr("srcset", srcSet)
      .attr("sizes", "(max-width: 848px) 100vw, 768px")
      .attr("width", `${biggestImage.width}`)
      .attr("height", `${biggestImage.height}`)
      .css("background-color", dominantColor)
      .addClass("fadeInOnLoad");
  }

  return {
    html: $.html(),
    images
  };
};

export const exportImage = async (src: string, alt: string): Promise<Image> => {
  const publicDir = path.join(process.cwd(), "public");
  const hash = sha256(await fs.readFile(src));
  const { name } = path.parse(src);
  const dominantColorArray = await ColorThief.getColor(src);
  // TODO: speed up dominant color check
  const dominantColor = `rgb(${dominantColorArray.join(",")})`;
  const imageSizes: Partial<ImageSizes> = {};

  for (const imageSize of IMAGE_SIZES) {
    const relativeUrl = path.join(
      "/images",
      `${slugify(`${name}-${hash}-${imageSize}`)}.jpg`
    );
    const absoluteUrl = url.resolve(ORIGIN, relativeUrl);
    const dest = path.join(publicDir, relativeUrl);
    // TODO: remove duplicate images when it is smaller than the target size
    const { width, height } = await optimizeImage(src, dest, imageSize);

    imageSizes[imageSize] = {
      width,
      height,
      url: relativeUrl,
      absoluteUrl
    };
  }

  return {
    alt,
    dominantColor,
    sizes: imageSizes as ImageSizes
  };
};

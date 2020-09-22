import cheerio from "cheerio";
import path from "path";

import { ORIGIN } from "../../../config";
import { Image } from "../../../entities/image.entity";
import { convertRgbToRgba } from "../../../utils/rgb-to-rgba/rgb-to-rgba";
import { exportImage } from "../../../utils/export-image/export-image";

export const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

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
    const { medium, large } = sizes;

    images.push(exportedImage);

    $(imageElement)
      .attr("src", medium.url)
      .attr(
        "srcset",
        `${medium.url} ${medium.width}w, ${large.url} ${large.width}w`
      )
      .attr("width", `${large.width}`)
      .attr("height", `${large.height}`)
      .css("background-color", dominantColor)
      .addClass("fadeInOnLoad");
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
    const dominantColor = $(elem).css("background-color");
    const dominantColorRgba = convertRgbToRgba(dominantColor, 0.5);

    $(elem).css("background-color", "");

    $(elem)
      .wrap(
        `<div style="padding-top: ${imageRatio}%; background-color: ${dominantColorRgba};"></div>`
      )
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

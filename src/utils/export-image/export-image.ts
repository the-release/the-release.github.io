import path from "path";
import { promises as fs } from "fs";
import url from "url";
import ColorThief from "colorthief";

import { sha256 } from "../sha256/sha256";
import {
  SMALL_IMAGE_WIDTH,
  MEDIUM_IMAGE_WIDTH,
  LARGE_IMAGE_WIDTH,
  ORIGIN
} from "../../config";
import { optimizeImage } from "../resize-image/resize-image";
import { Image } from "../../entities/image.entity";

export const exportImage = async (src: string, alt: string): Promise<Image> => {
  const publicDir = path.join(process.cwd(), "public");
  const hash = sha256(await fs.readFile(src));
  const { name } = path.parse(src);

  const exportPathSmall = path.join("/images", `${name}-${hash}-small.jpg`);
  const exportPathMedium = path.join("/images", `${name}-${hash}-medium.jpg`);
  const exportPathLarge = path.join("/images", `${name}-${hash}-large.jpg`);

  const destSmall = path.join(publicDir, exportPathSmall);
  const destMedium = path.join(publicDir, exportPathMedium);
  const destLarge = path.join(publicDir, exportPathLarge);

  const absoluteUrlSmall = url.resolve(ORIGIN, exportPathSmall);
  const absoluteUrlMedium = url.resolve(ORIGIN, exportPathMedium);
  const absoluteUrlLarge = url.resolve(ORIGIN, exportPathLarge);

  const imageSizeSmall = {
    ...(await optimizeImage(src, destSmall, SMALL_IMAGE_WIDTH)),
    url: exportPathSmall,
    absoluteUrl: absoluteUrlSmall
  };

  const imageSizeMedium = {
    ...(await optimizeImage(src, destMedium, MEDIUM_IMAGE_WIDTH)),
    url: exportPathMedium,
    absoluteUrl: absoluteUrlMedium
  };

  const imageSizeLarge = {
    ...(await optimizeImage(src, destLarge, LARGE_IMAGE_WIDTH)),
    url: exportPathLarge,
    absoluteUrl: absoluteUrlLarge
  };

  const dominantColorArray = await ColorThief.getColor(destSmall);
  const dominantColor = `rgb(${dominantColorArray.join(",")})`;

  return {
    alt,
    dominantColor,
    sizes: {
      small: imageSizeSmall,
      medium: imageSizeMedium,
      large: imageSizeLarge
    }
  };
};

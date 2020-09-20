import path from "path";
import { promises as fs } from "fs";
import url from "url";
import sharp from "sharp";

import { sha256 } from "../../../utils/sha256/sha256";
import { optimizeImage } from "../../../utils/resize-image/resize-image";
import { Image } from "../../../entities/image.entity";
import {
  LARGE_IMAGE_WIDTH,
  MEDIUM_IMAGE_WIDTH,
  ORIGIN,
  SMALL_IMAGE_WIDTH
} from "../../../config";

export const exportImage = async (
  filename: string,
  slug: string,
  alt: string
): Promise<Image> => {
  const authorsDir = path.join(process.cwd(), "data", "authors");
  const publicDir = path.join(process.cwd(), "public");
  const src = path.join(authorsDir, filename);
  const hash = sha256(await fs.readFile(src));

  const exportPathSmall = path.join("/author", `${slug}-${hash}-small.jpg`);
  const exportPathMedium = path.join("/author", `${slug}-${hash}-medium.jpg`);
  const exportPathLarge = path.join("/author", `${slug}-${hash}-large.jpg`);

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

  const {
    dominant: { r, g, b }
  } = await sharp(destSmall).stats();
  const dominantColor = `rgb(${[r, g, b].join(",")})`;

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

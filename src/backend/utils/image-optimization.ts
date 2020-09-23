import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

import { isFile } from "./is-file";

export const optimizeImage = async (
  src: string,
  dest: string,
  maxWidth: number
) => {
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

  return resizeImage({
    src,
    dest,
    quality: 80,
    width: maxWidth
  });
};

const resizeImage = async ({
  src,
  dest,
  width = null,
  height = null,
  quality = 100
}: {
  src: string;
  dest: string;
  width?: number | null;
  height?: number | null;
  quality?: number;
}) => {
  await fs.mkdir(path.parse(dest).dir, { recursive: true });
  const { info, data } = await sharp(src)
    .resize(width, height, {
      withoutEnlargement: true
    })
    .sharpen()
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality })
    .toBuffer({ resolveWithObject: true });

  await fs.writeFile(dest, data);

  return {
    width: info.width,
    height: info.height
  };
};

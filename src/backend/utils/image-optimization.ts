import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

import { isFile } from "./is-file";

export const optimizeImage = async (
  src: string,
  dest: string,
  maxWidth: number
) => {
  const options = {
    src,
    dest,
    quality: 80
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

  // Skip resize if the file is narrower than the target width
  if (info.width <= maxWidth) {
    return await resizeImage(options);
  }

  return resizeImage({
    ...options,
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
    .resize(width, height)
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

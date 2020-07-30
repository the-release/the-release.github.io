import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

export const resizeImage = async ({
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
  sharp(src)
    .resize(width, height)
    .jpeg({ quality })
    .toFile(dest)
    .catch(err => {
      console.log("----------");
      console.log(src);
      console.log(err);
    });
};

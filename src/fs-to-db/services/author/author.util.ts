import path from "path";
import { promises as fs } from "fs";
import { isFile } from "../../../utils/is-file/is-file";
import { slugify } from "../../../utils/slugify/slugify";
import { sha256 } from "../../../utils/sha256/sha256";
import { resizeImage } from "../../../utils/resize-image/resize-image";

const authorsDir = path.join(process.cwd(), "data", "authors");
const publicDir = path.join(process.cwd(), "public");

const generateThumbnail = async (src: string, dest: string) => {
  return resizeImage({
    src,
    dest,
    width: 100,
    quality: 60
  });
};

export const exportImage = async (filename: string) => {
  const src = path.join(authorsDir, filename);
  const hash = sha256(await fs.readFile(src));
  const { name } = path.parse(filename);
  const newPath = path.join("/author", `${slugify(name)}-${hash}.jpg`);
  const dest = path.join(publicDir, newPath);

  if (await isFile(dest)) return newPath;

  await generateThumbnail(src, dest);

  return newPath;
};

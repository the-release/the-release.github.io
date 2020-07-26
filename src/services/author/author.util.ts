import jimp from "jimp";
import path from "path";
import { promises as fs } from "fs";
import { isFile } from "../../utils/is-file/is-file";
import { slugify } from "../../utils/slugify/slugify";
import { sha256 } from "../../utils/sha256/sha256";

const authorsDir = path.join(process.cwd(), "data", "authors");
const publicDir = path.join(process.cwd(), "public");

const generateThumbnail = async (src: string, dest: string) => {
  const image = await jimp.read(src);

  await image.resize(100, jimp.AUTO);
  await image.quality(60);
  await image.writeAsync(dest);
};

export const exportImage = async (filename: string) => {
  const src = path.join(authorsDir, filename);
  const hash = sha256(await fs.readFile(src));
  const { name, ext } = path.parse(filename);
  const newPath = path.join("/author", `${slugify(name)}-${hash}${ext}`);
  const dest = path.join(publicDir, newPath);

  if (await isFile(dest)) return newPath;

  await generateThumbnail(src, dest);

  return newPath;
};

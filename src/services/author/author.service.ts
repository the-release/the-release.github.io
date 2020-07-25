import path from "path";
import { promises as fs } from "fs";

import { Author } from "./author.entity";
import { generateThumbnail } from "./author.util";
import { slugify } from "../../utils/slugify/slugify";
import { ORIGIN } from "../../config";

const authorsDir = path.join(process.cwd(), "data", "authors");
const publicDir = path.join(process.cwd(), "public");

const exportImage = async (filename: string) => {
  const src = path.join(authorsDir, filename);
  const { name, ext } = path.parse(filename);
  const destPath = path.join("/author", `${slugify(name)}${ext}`);
  const dest = path.join(publicDir, destPath);

  if ((await fs.stat(dest).catch(() => undefined))?.isFile()) return destPath;

  await generateThumbnail(src, dest);

  return destPath;
};

export const getAuthors = async (): Promise<Author[]> => {
  const items = await fs.readdir(authorsDir, { withFileTypes: true });
  const files = items.filter(item => item.isFile());

  return (
    await Promise.all(
      files.map(async ({ name: filename }) => {
        const name = path.parse(filename).name;
        const slug = slugify(name);
        const thumbnail = await exportImage(filename);

        return {
          url: `${ORIGIN}/author/${slug}`,
          slug,
          name,
          thumbnail
        };
      })
    )
  ).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
  });
};

export const getAuthorBySlug = async (slug: string): Promise<Author> => {
  const authors = await getAuthors();
  const author = authors.find(authors => authors.slug === slug);

  if (!author) throw new Error(`Author '${slug}' does not exist`);

  return author;
};

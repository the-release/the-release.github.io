import path from "path";
import { promises as fs } from "fs";
import slugify from "slugify";

import { Author } from "./author.entity";

const authorsDir = path.join(process.cwd(), "data", "authors");

export const getAuthors = async (): Promise<Author[]> => {
  const items = await fs.readdir(authorsDir, { withFileTypes: true });
  const files = items.filter(item => item.isFile());

  return files.map(({ name: filename }) => {
    const name = path.parse(filename).name;

    return {
      name,
      slug: slugify(name, {
        lower: true
      })
    };
  });
  // TODO: sort alphabetically
};

export const getAuthorBySlug = async (slug: string): Promise<Author> => {
  const authors = await getAuthors();
  const author = authors.find(authors => authors.slug === slug);

  if (!author) throw new Error(`Author '${slug}' does not exist`);

  return author;
};

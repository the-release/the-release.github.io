import path from "path";
import { promises as fs } from "fs";

import { Author } from "../../../entities/author.entity";
import { exportImage } from "./author.util";
import { slugify } from "../../../utils/slugify/slugify";
import { ORIGIN } from "../../../config";

const authorsDir = path.join(process.cwd(), "data", "authors");

export const getAuthors = async (): Promise<Author[]> => {
  const items = await fs.readdir(authorsDir, { withFileTypes: true });
  const files = items.filter(item => item.isFile());

  return await Promise.all(
    files.map(async ({ name: filename }) => {
      const name = path.parse(filename).name;
      const slug = slugify(name);
      const thumbnailUrl = await exportImage(filename);

      return {
        url: `/author/${slug}`,
        absoluteUrl: `${ORIGIN}/author/${slug}`,
        slug,
        name,
        thumbnailUrl
      };
    })
  );
};

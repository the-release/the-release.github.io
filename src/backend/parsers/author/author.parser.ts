import path from "path";
import { promises as fs } from "fs";

import { Author } from "../../../entities/author.entity";
import { exportImage } from "./author.util";
import { slugify } from "../../../utils/slugify/slugify";
import { ORIGIN } from "../../../config";
import { authorImageLinter } from "./author.linter";

const authorsDir = path.join(process.cwd(), "data", "authors");

export const getAuthors = async (): Promise<Author[]> => {
  const items = await fs.readdir(authorsDir, { withFileTypes: true });
  const files = items.filter(item => item.isFile());

  return await Promise.all(
    files.map(async ({ name: filename }) => {
      const name = path.parse(filename).name;
      const slug = slugify(name);

      try {
        const image = await exportImage(filename, slug, name);

        authorImageLinter(image);

        return {
          url: `/author/${slug}`,
          absoluteUrl: `${ORIGIN}/author/${slug}`,
          slug,
          name,
          image
        };
      } catch (err) {
        console.error(
          "Error:",
          err?.message ||
            "An unexpected error occurred while parsing the author"
        );
        console.error(`Author: ${slug}`);
        process.exit(1);
      }
    })
  );
};

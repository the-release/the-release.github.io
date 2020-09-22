import path from "path";
import { promises as fs } from "fs";

import { Author } from "../../../entities/author.entity";
import { slugify } from "../../../utils/slugify/slugify";
import { ORIGIN } from "../../../config";
import { authorImageLinter } from "./author.linter";
import { exportImage } from "../../../utils/export-image/export-image";

export const getAuthors = async (): Promise<Author[]> => {
  const authorsDir = path.join(process.cwd(), "data", "authors");
  const items = await fs.readdir(authorsDir, { withFileTypes: true });
  const files = items.filter(item => item.isFile());

  return await Promise.all(
    files.map(async ({ name: filename }) => {
      const name = path.parse(filename).name;
      const slug = slugify(name);
      const authorFilePath = path.join(authorsDir, filename);
      const alt = `A portrait photo of ${slug}`;

      try {
        const image = await exportImage(authorFilePath, alt);

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

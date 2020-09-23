import path from "path";
import { promises as fs } from "fs";

import { Category } from "../../../entities/category.entity";
import { ORIGIN } from "../../../config";
import { metadataSelector } from "./category.selector";

export const parseCategories = async (): Promise<Category[]> => {
  const categoriesDir = path.join(process.cwd(), "data", "categories");
  const items = await fs.readdir(categoriesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name: slug }) => {
      try {
        const categoryDir = path.join(categoriesDir, slug);
        const { name, keywords } = await metadataSelector(categoryDir);

        return {
          url: `/category/${slug}`,
          absoluteUrl: `${ORIGIN}/category/${slug}`,
          slug,
          name,
          keywords
        };
      } catch (err) {
        console.error(
          "Error:",
          err?.message ||
            "An unexpected error occurred while parsing the category"
        );
        console.error(`Category: ${slug}`);
        process.exit(1);
      }
    })
  );
};

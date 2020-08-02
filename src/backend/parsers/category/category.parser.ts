import path from "path";
import { promises as fs } from "fs";

import { Category } from "../../../entities/category.entity";
import { ORIGIN } from "../../../config";
import { metadataSelector } from "./category.selector";

const categoriesDir = path.join(process.cwd(), "data", "categories");

export const getCategories = async (): Promise<Category[]> => {
  const items = await fs.readdir(categoriesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name: slug }) => {
      const categoryDir = path.join(categoriesDir, slug);
      const { name, keywords, description } = await metadataSelector(
        categoryDir
      ).catch(err => {
        console.error(
          err?.message || "Unable to parse metadata",
          `for category /${slug}`
        );
        process.exit(1);
      });

      return {
        url: `/category/${slug}`,
        absoluteUrl: `${ORIGIN}/category/${slug}`,
        slug,
        name,
        keywords,
        description
      };
    })
  );
};

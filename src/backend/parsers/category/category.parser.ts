import path from "path";
import { promises as fs } from "fs";

import { Category } from "../../../entities/category.entity";
import { slugify } from "../../../utils/slugify/slugify";
import { ORIGIN } from "../../../config";

const categoriesFilePath = path.join(process.cwd(), "data", "categories.txt");

export const getCategories = async (): Promise<Category[]> => {
  const categories = await fs.readFile(categoriesFilePath, "utf8");

  return categories
    .split("\n")
    .filter(category => !!category)
    .map(category => {
      const name = category.trim();
      const slug = slugify(name);

      return {
        url: `/category/${slug}`,
        absoluteUrl: `${ORIGIN}/category/${slug}`,
        slug,
        name
      };
    });
};

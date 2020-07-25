import path from "path";
import { promises as fs } from "fs";

import { Category } from "./category.entity";
import { slugify } from "../../utils/slugify/slugify";
import { ORIGIN } from "../../config";

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
        url: `${ORIGIN}/category/${slug}`,
        slug,
        name
      };
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const categories = await getCategories();
  const category = categories.find(categories => categories.slug === slug);

  if (!category) throw new Error(`Category '${slug}' does not exist`);

  return category;
};

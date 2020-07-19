import path from "path";
import { promises as fs } from "fs";
import { Category } from "./category.entity";

const categoriesFilePath = path.join(process.cwd(), "data", "categories.txt");

export const getCategories = async (): Promise<Category[]> => {
  const categories = await fs.readFile(categoriesFilePath, "utf8");

  return categories.split("\n").map(category => {
    return {
      name: category.trim()
    };
  });
};

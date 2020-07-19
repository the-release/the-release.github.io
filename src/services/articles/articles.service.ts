import path from "path";
import fs from "fs";
import { Article } from "./article.entity";

export const getArticles = (): Article[] => {
  const postsDirectory = path.join(process.cwd(), "articles");
  const files = fs.readdirSync(postsDirectory);

  return files.map(file => {
    return {
      slug: path.parse(file).name
    };
  });
};

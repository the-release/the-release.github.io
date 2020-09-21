import { ConnectionOptions } from "typeorm";
import { Article } from "./entities/article.entity";
import { Category } from "./entities/category.entity";
import { Author } from "./entities/author.entity";
import { Page } from "./entities/page.entity";

export const TYPEORM_CONFIG: ConnectionOptions = {
  type: "sqlite",
  database: `/tmp/the-release/db.sqlite`,
  entities: [Article, Category, Author, Page],
  synchronize: true,
  logging: false
};

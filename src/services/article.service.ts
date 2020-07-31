import { FindOneOptions, getRepository } from "typeorm";
import { Article } from "../entities/article.entity";
import { pick } from "../utils/pick/pick";
import { dbConnection } from "../backend/db";

interface GetOptions<U> {
  props?: Array<U>;
  limit?: number;
  where?: FindOneOptions<Article>["where"];
}

export const getArticles = async <U extends keyof Article>({
  props,
  limit,
  where
}: GetOptions<U> = {}) => {
  await dbConnection();
  const articles = await getRepository(Article).find({
    order: {
      timestamp: "DESC"
    },
    relations: ["category", "author"],
    select: props ? [...props, "slug", "timestamp"] : undefined,
    take: limit,
    where
  });

  const jsonsifiedArticles: Article[] = JSON.parse(JSON.stringify(articles));

  if (!props) return jsonsifiedArticles;

  return jsonsifiedArticles.map(article => pick(article, props));
};

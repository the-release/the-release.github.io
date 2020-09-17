import { FindOneOptions, getRepository } from "typeorm";
import { Article } from "../entities/article.entity";
import { pick } from "../utils/pick/pick";
import { dbConnection } from "../backend/db";
import { NODE_ENV } from "../config";

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
    select: props ? [...props, "slug", "timestamp", "isDraft"] : undefined,
    take: limit,
    where
  });

  const filteredArticles = articles.filter(({ isDraft }) => {
    const isDev = NODE_ENV === "development";

    return !(!isDev && isDraft);
  });

  const jsonsifiedArticles: Article[] = JSON.parse(
    JSON.stringify(filteredArticles)
  );

  if (!props) return jsonsifiedArticles;

  return jsonsifiedArticles.map(article => pick(article, props));
};

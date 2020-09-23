import { FindOneOptions, getRepository } from "typeorm";
import { pick } from "../utils/pick";
import { Category } from "../entities/category.entity";
import { dbConnection } from "../backend/db";

interface GetOptions<U> {
  props?: Array<U>;
  limit?: number;
  where?: FindOneOptions<Category>["where"];
}

export const getCategories = async <U extends keyof Category>({
  props,
  limit,
  where
}: GetOptions<U> = {}) => {
  await dbConnection();
  const categories = await getRepository(Category).find({
    order: {
      name: "ASC"
    },
    select: props ? [...props, "name"] : undefined,
    take: limit,
    where
  });

  const jsonsifiedCategories: Category[] = JSON.parse(
    JSON.stringify(categories)
  );

  if (!props) return jsonsifiedCategories;

  return jsonsifiedCategories.map(category => pick(category, props));
};

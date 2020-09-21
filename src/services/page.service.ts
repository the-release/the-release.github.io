import { FindOneOptions, getRepository } from "typeorm";
import { pick } from "../utils/pick/pick";
import { dbConnection } from "../backend/db";
import { Page } from "../entities/page.entity";

interface GetOptions<U> {
  props?: Array<U>;
  limit?: number;
  where?: FindOneOptions<Page>["where"];
}

export const getPages = async <U extends keyof Page>({
  props,
  limit,
  where
}: GetOptions<U> = {}) => {
  await dbConnection();
  const pages = await getRepository(Page).find({
    select: props ? [...props, "slug"] : undefined,
    take: limit,
    where
  });

  const jsonsifiedPages: Page[] = JSON.parse(JSON.stringify(pages));

  if (!props) return jsonsifiedPages;

  return jsonsifiedPages.map(page => pick(page, props));
};

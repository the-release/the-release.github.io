import { FindOneOptions, getRepository } from "typeorm";
import { pick } from "../utils/pick/pick";
import { Author } from "../entities/author.entity";

interface GetOptions<U> {
  props?: Array<U>;
  limit?: number;
  where?: FindOneOptions<Author>["where"];
}

export const getAuthors = async <U extends keyof Author>({
  props,
  limit,
  where
}: GetOptions<U> = {}) => {
  const authors = await getRepository(Author).find({
    order: {
      name: "ASC"
    },
    select: props ? [...props, "name"] : undefined,
    take: limit,
    where
  });

  const jsonsifiedAuthors: Author[] = JSON.parse(JSON.stringify(authors));

  if (!props) return jsonsifiedAuthors;

  return jsonsifiedAuthors.map(author => pick(author, props));
};

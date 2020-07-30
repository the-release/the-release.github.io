import { GetStaticProps } from "next";
import { getRepository } from "typeorm";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { HOMEPAGE_MAX_ITEMS } from "../config";
import { Article } from "../entities/article.entity";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { dbConnection } from "../fs-to-db/db";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  await dbConnection();

  const categories = await getRepository(Category).find();
  const authors = await getRepository(Author).find();
  const articles = await getRepository(Article).find({
    order: {
      timestamp: "DESC"
    },
    take: HOMEPAGE_MAX_ITEMS,
    relations: ["category", "author"]
  });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      categories: categories.map(category => ({ ...category })),
      authors: authors.map(author => ({ ...author }))
    }
  };
};

export default PageHome;

import { GetStaticProps } from "next";
import { getRepository } from "typeorm";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { HOMEPAGE_MAX_ITEMS } from "../config";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { dbConnection } from "../fs-to-db/db";
import { getArticles } from "../services/article.service";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  await dbConnection();

  const categories = await getRepository(Category).find();
  const authors = await getRepository(Author).find();
  const articles = await getArticles({
    props: ["title", "url", "thumbnail", "coverImageAlt"],
    limit: HOMEPAGE_MAX_ITEMS
  });

  return {
    props: {
      articles,
      categories: categories.map(category => ({ ...category })),
      authors: authors.map(author => ({ ...author }))
    }
  };
};

export default PageHome;

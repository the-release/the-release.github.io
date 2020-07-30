import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRepository } from "typeorm";

import {
  PageCategory,
  PageCategoryProps
} from "../../modules/page-category/page-category.component";
import { paginate } from "../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../config";
import { dbConnection } from "../../fs-to-db/db";
import { Category } from "../../entities/category.entity";
import { Article } from "../../entities/article.entity";

interface PageCategoryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageCategoryParams> = async () => {
  await dbConnection();

  const categories = await getRepository(Category).find();
  const paths = categories.map(({ slug }) => {
    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  PageCategoryProps,
  PageCategoryParams
> = async ({ params }) => {
  await dbConnection();

  const slug = params!.slug;
  const category = await getRepository(Category).findOneOrFail({
    slug
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getRepository(Article).find({
      where: {
        category: slug
      },
      order: {
        timestamp: "DESC"
      },
      relations: ["category", "author"]
    }),
    ITEMS_PER_PAGE
  );

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      category: JSON.parse(JSON.stringify(category)),
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageCategory;

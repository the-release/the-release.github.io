import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRepository } from "typeorm";

import {
  PageCategory,
  PageCategoryProps
} from "../../../modules/page-category/page-category.component";
import { paginate } from "../../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../../config";
import { dbConnection } from "../../../fs-to-db/db";
import { Category } from "../../../entities/category.entity";
import { getArticles } from "../../../services/article.service";

interface PageCategoryParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageCategoryParams> = async () => {
  await dbConnection();

  const categories = await getRepository(Category).find();
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const category of categories) {
    const { pages } = paginate(
      await getArticles({
        props: [],
        where: {
          category: category.slug
        }
      }),
      ITEMS_PER_PAGE
    );

    for (const pageIndex in pages) {
      paths.push({
        params: { slug: category.slug, page: pageIndex.toString() }
      });
    }
  }

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
  const page = params!.page;
  const pageIndex = parseInt(page, 10);
  const category = await getRepository(Category).findOneOrFail({
    slug
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "url", "thumbnail", "coverImageAlt"],
      where: {
        category: slug
      }
    }),
    ITEMS_PER_PAGE,
    pageIndex
  );

  return {
    props: {
      articles,
      category: JSON.parse(JSON.stringify(category)),
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageCategory;

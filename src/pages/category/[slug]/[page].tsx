import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageCategory,
  PageCategoryProps
} from "../../../modules/page-category/page-category.component";
import { paginate } from "../../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../../config";
import { getArticles } from "../../../services/article.service";
import { getCategories } from "../../../services/category.service";

interface PageCategoryParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageCategoryParams> = async () => {
  const categories = await getCategories({ props: ["slug"] });
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
  const slug = params!.slug;
  const pageIndex = parseInt(params!.page, 10);
  const [category] = await getCategories({
    where: {
      slug
    }
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "lede", "url", "thumbnailUrl", "coverImageAlt"],
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
      category,
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageCategory;

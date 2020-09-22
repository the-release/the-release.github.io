import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageCategory,
  PageCategoryProps
} from "../../modules/page-category/page-category.component";
import { paginate } from "../../utils/paginate";
import { ITEMS_PER_PAGE } from "../../config";
import { getArticles } from "../../services/article.service";
import { getCategories } from "../../services/category.service";

interface PageCategoryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageCategoryParams> = async () => {
  const categories = await getCategories({ props: ["slug"] });
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
  const slug = params!.slug;
  const [category] = await getCategories({
    where: {
      slug
    }
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "lede", "url", "images"],
      where: {
        category: slug
      }
    }),
    ITEMS_PER_PAGE
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

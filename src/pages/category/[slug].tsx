import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { getArticlesByCategorySlug } from "../../services/article/article.service";
import {
  getCategories,
  getCategoryBySlug
} from "../../services/category/category.service";
import {
  PageCategory,
  PageCategoryProps
} from "../../modules/page-category/page-category.component";
import { paginate } from "../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../config";

interface PageCategoryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageCategoryParams> = async () => {
  const categories = await getCategories();
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
  const category = await getCategoryBySlug(slug);
  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticlesByCategorySlug(slug, [
      "title",
      "url",
      "thumbnail",
      "coverImageAlt"
    ]),
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

import { GetStaticProps } from "next";

import { getArticlesByCategorySlug } from "../../../services/article/article.service";
import {
  getCategories,
  getCategoryBySlug
} from "../../../services/category/category.service";
import {
  PageCategory,
  PageCategoryProps
} from "../../../modules/page-category/page-category.component";
import { paginate } from "../../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../../config";

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const category of categories) {
    const articles = await getArticlesByCategorySlug(category.slug);
    const paginatedArticles = paginate(articles, ITEMS_PER_PAGE);

    for (const pageIndex in paginatedArticles.pages) {
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

export const getStaticProps: GetStaticProps<PageCategoryProps> = async ({
  params
}: any) => {
  const category = await getCategoryBySlug(params.slug);
  const pageIndex = parseInt(params.page, 10);
  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticlesByCategorySlug(params.slug, [
      "title",
      "url",
      "thumbnail",
      "coverImageAlt"
    ]),
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

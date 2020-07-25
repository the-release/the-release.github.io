import { GetStaticProps } from "next";

import { getArticlesByCategorySlug } from "../../services/article/article.service";
import {
  getCategories,
  getCategoryBySlug
} from "../../services/category/category.service";
import {
  PageCategory,
  PageCategoryProps
} from "../../modules/page-category/page-category.component";

export const getStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<PageCategoryProps> = async ({
  params
}: any) => {
  const articles = await getArticlesByCategorySlug(params.slug, [
    "title",
    "url",
    "thumbnail"
  ]);
  const category = await getCategoryBySlug(params.slug);

  return {
    props: {
      articles,
      category
    }
  };
};

export default PageCategory;

import { GetStaticProps } from "next";

import { getArticlesByCategory } from "../../services/article/article.service";
import { getCategories } from "../../services/category/category.service";
import {
  PageCategory,
  PageCategoryProps
} from "../../modules/page-category/page-category.component";

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map(({ name }) => {
    return {
      params: { slug: name }
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
  const articles = await getArticlesByCategory(params.slug);

  return {
    props: {
      articles
    }
  };
};

export default PageCategory;

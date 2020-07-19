import { GetStaticProps } from "next";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { getArticles } from "../services/article/article.service";
import { getCategories } from "../services/category/category.service";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  const articles = await getArticles();
  const categories = await getCategories();

  return {
    props: {
      articles,
      categories
    }
  };
};

export default PageHome;

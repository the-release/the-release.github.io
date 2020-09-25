import { GetStaticProps } from "next";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { HOMEPAGE_MAX_ITEMS } from "../config";
import { getArticles } from "../services/article.service";
import { getCategories } from "../services/category.service";
import { getAuthors } from "../services/author.service";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  const categories = await getCategories();
  const authors = await getAuthors();
  const articles = await getArticles({
    props: ["title", "lede", "url", "coverImage", "category"],
    limit: HOMEPAGE_MAX_ITEMS
  });

  return {
    props: {
      articles,
      categories,
      authors
    }
  };
};

export default PageHome;

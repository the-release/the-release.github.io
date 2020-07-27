import { GetStaticProps } from "next";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { getArticles } from "../services/article/article.service";
import { getCategories } from "../services/category/category.service";
import { getAuthors } from "../services/author/author.service";
import { HOMEPAGE_MAX_ITEMS } from "../config";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  const articles = await getArticles([
    "title",
    "url",
    "thumbnail",
    "coverImageAlt"
  ]);
  const categories = await getCategories();
  const authors = await getAuthors();

  return {
    props: {
      articles: articles.slice(0, HOMEPAGE_MAX_ITEMS),
      categories,
      authors
    }
  };
};

export default PageHome;

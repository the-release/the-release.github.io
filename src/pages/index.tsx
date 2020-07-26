import { GetStaticProps } from "next";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { getArticles } from "../services/article/article.service";
import { getCategories } from "../services/category/category.service";
import { getAuthors } from "../services/author/author.service";

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
      articles,
      categories,
      authors
    }
  };
};

export default PageHome;

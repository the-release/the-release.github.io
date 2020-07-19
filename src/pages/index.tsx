import { GetStaticProps } from "next";

import {
  PageHome,
  PageHomeProps
} from "../modules/page-home/page-home.component";
import { getArticles } from "../services/article/article.service";

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  const articles = await getArticles();

  return {
    props: {
      articles
    }
  };
};

export default PageHome;

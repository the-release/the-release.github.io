import { PageHome } from "../modules/page-home/page-home.component";
import { getArticles } from "../services/articles/articles.service";

export const getStaticProps = () => {
  const articles = getArticles();

  return {
    props: {
      articles
    }
  };
};

export default PageHome;

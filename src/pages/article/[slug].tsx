import { GetStaticProps } from "next";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import {
  getArticleBySlug,
  getArticles
} from "../../services/article/article.service";

export const getStaticPaths = async () => {
  const articles = await getArticles();
  const paths = articles.map(({ slug }) => {
    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PageArticleProps> = async ({
  params
}: any) => {
  const article = await getArticleBySlug(params.slug, [
    "title",
    "description",
    "coverImageUrl",
    "creationDate",
    "category",
    "author",
    "htmlContent",
    "readingTime",
    "url"
  ]);

  return {
    props: {
      article
    }
  };
};

export default PagePost;

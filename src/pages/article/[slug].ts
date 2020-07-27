import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import {
  getArticleBySlug,
  getArticles
} from "../../services/article/article.service";

interface PageArticleParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageArticleParams> = async () => {
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

export const getStaticProps: GetStaticProps<
  PageArticleProps,
  PageArticleParams
> = async ({ params }) => {
  const article = await getArticleBySlug(params!.slug, [
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

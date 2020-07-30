import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import { dbConnection } from "../../fs-to-db/db";
import { getArticles } from "../../services/article.service";

interface PageArticleParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageArticleParams> = async () => {
  await dbConnection();

  const articles = await getArticles({
    props: ["slug"]
  });
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
  await dbConnection();

  const [article] = await getArticles({
    where: {
      slug: params!.slug
    }
  });

  return {
    props: {
      article
    }
  };
};

export default PagePost;

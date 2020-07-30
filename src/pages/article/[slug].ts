import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRepository } from "typeorm";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import { dbConnection } from "../../fs-to-db/db";
import { Article } from "../../entities/article.entity";

interface PageArticleParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageArticleParams> = async () => {
  await dbConnection();

  const articles = await getRepository(Article).find();
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

  const article = await getRepository(Article).findOneOrFail(
    { slug: params!.slug },
    {
      relations: ["category", "author"]
    }
  );

  return {
    props: {
      article: JSON.parse(JSON.stringify(article))
    }
  };
};

export default PagePost;

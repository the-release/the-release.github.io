import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import { getArticles } from "../../fs-to-db/services/fs/article.service";
import { dbConnection } from "../../fs-to-db/db";
import { getRepository } from "typeorm";
import { Article } from "../../entities/article.entity";

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
  await dbConnection();

  const articleRepository = getRepository(Article);
  const article = await articleRepository.findOneOrFail(
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

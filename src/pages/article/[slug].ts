import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { LessThan } from "typeorm";

import {
  PageArticleProps,
  PagePost
} from "../../modules/page-article/page-article.component";
import { getArticles } from "../../services/article.service";

interface PageArticleParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageArticleParams> = async () => {
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
  const [article] = await getArticles({
    props: [
      "title",
      "lede",
      "images",
      "publishedAt",
      "category",
      "author",
      "htmlContent",
      "readingTime",
      "absoluteUrl",
      "timestamp",
      "keywords"
    ],
    where: {
      slug: params!.slug
    }
  });

  const nextArticles = await getArticles({
    props: ["title", "lede", "url", "images"],
    limit: 3,
    where: {
      category: article.category,
      timestamp: LessThan(article.timestamp)
    }
  });

  return {
    props: {
      article,
      nextArticles
    }
  };
};

export default PagePost;

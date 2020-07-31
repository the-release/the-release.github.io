import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

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
      "description",
      "coverImageUrl",
      "publishedAt",
      "category",
      "author",
      "htmlContent",
      "readingTime",
      "absoluteUrl"
    ],
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

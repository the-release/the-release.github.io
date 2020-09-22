import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PageAuthor,
  PageAuthorProps
} from "../../modules/page-author/page-author.component";
import { paginate } from "../../utils/paginate";
import { ITEMS_PER_PAGE } from "../../config";
import { getArticles } from "../../services/article.service";
import { getAuthors } from "../../services/author.service";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  const authors = await getAuthors({ props: ["slug"] });
  const paths = authors.map(({ slug }) => {
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
  PageAuthorProps,
  PageAuthorParams
> = async ({ params }) => {
  const slug = params!.slug;
  const [author] = await getAuthors({
    where: {
      slug
    }
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "lede", "url", "images"],
      where: {
        author: slug
      }
    }),
    ITEMS_PER_PAGE
  );

  return {
    props: {
      articles,
      author,
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageAuthor;

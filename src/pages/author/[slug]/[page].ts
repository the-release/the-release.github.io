import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { paginate } from "../../../utils/paginate";
import {
  PageAuthor,
  PageAuthorProps
} from "../../../modules/page-author/page-author.component";
import { ITEMS_PER_PAGE } from "../../../config";
import { getArticles } from "../../../services/article.service";
import { getAuthors } from "../../../services/author.service";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  const authors = await getAuthors({ props: ["slug"] });
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const author of authors) {
    const { pages } = paginate(
      await getArticles({
        props: [],
        where: {
          author: author.slug
        }
      }),
      ITEMS_PER_PAGE
    );

    for (const pageIndex in pages) {
      paths.push({
        params: { slug: author.slug, page: pageIndex.toString() }
      });
    }
  }

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
  const pageIndex = parseInt(params!.page, 10);
  const [author] = await getAuthors({
    where: {
      slug
    }
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "lede", "url", "coverImage"],
      where: {
        author: slug
      }
    }),
    ITEMS_PER_PAGE,
    pageIndex
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

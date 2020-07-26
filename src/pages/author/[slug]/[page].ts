import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  getAuthorBySlug,
  getAuthors
} from "../../../services/author/author.service";
import { getArticlesByAuthorSlug } from "../../../services/article/article.service";
import { paginate } from "../../../utils/paginate/paginate";
import {
  PageAuthor,
  PageAuthorProps
} from "../../../modules/page-author/page-author.component";
import { ITEMS_PER_PAGE } from "../../../config";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  const authors = await getAuthors();
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const author of authors) {
    const articles = await getArticlesByAuthorSlug(author.slug);
    const paginatedArticles = paginate(articles, ITEMS_PER_PAGE);

    for (const pageIndex in paginatedArticles.pages) {
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
  const page = params!.page;
  const author = await getAuthorBySlug(slug);
  const pageIndex = parseInt(page, 10);
  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticlesByAuthorSlug(slug, [
      "title",
      "url",
      "thumbnail",
      "coverImageAlt"
    ]),
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

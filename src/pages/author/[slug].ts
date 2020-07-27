import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { getArticlesByAuthorSlug } from "../../services/article/article.service";
import {
  getAuthorBySlug,
  getAuthors
} from "../../services/author/author.service";
import {
  PageAuthor,
  PageAuthorProps
} from "../../modules/page-author/page-author.component";
import { paginate } from "../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../config";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  const authors = await getAuthors();
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
  const author = await getAuthorBySlug(slug);
  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticlesByAuthorSlug(slug, [
      "title",
      "url",
      "thumbnail",
      "coverImageAlt"
    ]),
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

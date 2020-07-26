import { GetStaticProps } from "next";

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

export const getStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<PageAuthorProps> = async ({
  params
}: any) => {
  const author = await getAuthorBySlug(params.slug);
  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticlesByAuthorSlug(params.slug, [
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

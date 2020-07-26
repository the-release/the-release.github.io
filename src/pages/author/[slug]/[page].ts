import { GetStaticProps } from "next";
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

export const getStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<PageAuthorProps> = async ({
  params
}: any) => {
  const articles = await getArticlesByAuthorSlug(params.slug, [
    "title",
    "url",
    "thumbnail",
    "coverImageAlt"
  ]);
  const author = await getAuthorBySlug(params.slug);
  const pageIndex = parseInt(params.page, 10);
  const { pageItems, previousPageIndex, nextPageIndex } = paginate(
    articles,
    ITEMS_PER_PAGE,
    pageIndex
  );

  return {
    props: {
      articles: pageItems,
      author,
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageAuthor;

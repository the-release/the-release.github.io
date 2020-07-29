import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { paginate } from "../../../utils/paginate/paginate";
import {
  PageAuthor,
  PageAuthorProps
} from "../../../modules/page-author/page-author.component";
import { ITEMS_PER_PAGE } from "../../../config";
import { dbConnection } from "../../../fs-to-db/db";
import { getRepository } from "typeorm";
import { Author } from "../../../entities/author.entity";
import { Article } from "../../../entities/article.entity";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  await dbConnection();
  const authorRepository = getRepository(Author);
  const articleRepository = getRepository(Article);
  const authors = await authorRepository.find();
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const author of authors) {
    const articles = await articleRepository.find({
      where: {
        author: author.slug
      }
    });
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
  const pageIndex = parseInt(page, 10);

  await dbConnection();
  const authorRepository = getRepository(Author);
  const articleRepository = getRepository(Article);
  const author = await authorRepository.findOneOrFail({
    slug
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await articleRepository.find({
      where: {
        author: slug
      },
      order: {
        timestamp: "DESC"
      },
      relations: ["category", "author"]
    }),
    ITEMS_PER_PAGE,
    pageIndex
  );

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      author: JSON.parse(JSON.stringify(author)),
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageAuthor;

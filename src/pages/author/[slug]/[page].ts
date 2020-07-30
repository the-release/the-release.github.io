import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRepository } from "typeorm";

import { paginate } from "../../../utils/paginate/paginate";
import {
  PageAuthor,
  PageAuthorProps
} from "../../../modules/page-author/page-author.component";
import { ITEMS_PER_PAGE } from "../../../config";
import { dbConnection } from "../../../fs-to-db/db";
import { Author } from "../../../entities/author.entity";
import { Article } from "../../../entities/article.entity";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  await dbConnection();

  const authors = await getRepository(Author).find();
  const paths: {
    params: { slug: string; page: string };
  }[] = [];

  for (const author of authors) {
    const paginatedArticles = paginate(
      await getRepository(Article).find({
        where: {
          author: author.slug
        }
      }),
      ITEMS_PER_PAGE
    );

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
  await dbConnection();

  const slug = params!.slug;
  const page = params!.page;
  const pageIndex = parseInt(page, 10);
  const author = await getRepository(Author).findOneOrFail({
    slug
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getRepository(Article).find({
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

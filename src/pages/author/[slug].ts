import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRepository } from "typeorm";

import {
  PageAuthor,
  PageAuthorProps
} from "../../modules/page-author/page-author.component";
import { paginate } from "../../utils/paginate/paginate";
import { ITEMS_PER_PAGE } from "../../config";
import { dbConnection } from "../../fs-to-db/db";
import { Article } from "../../entities/article.entity";
import { Author } from "../../entities/author.entity";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  await dbConnection();
  const authorRepository = getRepository(Author);
  const authors = await authorRepository.find();
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
    ITEMS_PER_PAGE
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

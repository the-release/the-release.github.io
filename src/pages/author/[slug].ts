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
import { Author } from "../../entities/author.entity";
import { getArticles } from "../../services/article.service";

interface PageAuthorParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageAuthorParams> = async () => {
  await dbConnection();

  const authors = await getRepository(Author).find();
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
  await dbConnection();

  const slug = params!.slug;
  const author = await getRepository(Author).findOneOrFail({
    slug
  });

  const { pageItems: articles, previousPageIndex, nextPageIndex } = paginate(
    await getArticles({
      props: ["title", "url", "thumbnail", "coverImageAlt"],
      where: {
        author: slug
      }
    }),
    ITEMS_PER_PAGE
  );

  return {
    props: {
      articles,
      author: JSON.parse(JSON.stringify(author)),
      previousPageIndex,
      nextPageIndex
    }
  };
};

export default PageAuthor;

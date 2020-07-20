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
  const articles = await getArticlesByAuthorSlug(params.slug);
  const author = await getAuthorBySlug(params.slug);

  return {
    props: {
      articles,
      author
    }
  };
};

export default PageAuthor;

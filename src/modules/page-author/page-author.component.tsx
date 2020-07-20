import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Author } from "../../services/author/author.entity";

export interface PageAuthorProps {
  articles: Article[];
  author: Author;
}

export const PageAuthor: FC<PageAuthorProps> = ({ articles, author }) => {
  return (
    <>
      <Head>
        <title>Etienne Martin – Web Architect</title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">
          <img width={100} src={author.thumbnail} />
          {author.name}
        </Heading>
        {articles.map(({ slug, thumbnail }, index) => (
          <React.Fragment key={index}>
            <a href={`/article/${slug}`}>
              {slug}
              <br />
              {thumbnail && <img alt="" src={thumbnail} />}
            </a>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";

export interface PageCategoryProps {
  articles: Article[];
}

export const PageCategory: FC<PageCategoryProps> = ({ articles }) => {
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
        <Heading component="h1">Category</Heading>
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

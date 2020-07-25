import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Category } from "../../services/category/category.entity";

export interface PageCategoryProps {
  articles: Article[];
  category: Category;
}

export const PageCategory: FC<PageCategoryProps> = ({ articles, category }) => {
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
        <Heading component="h1">{category.name}</Heading>
        {articles.map(({ url, title, thumbnail }, index) => (
          <React.Fragment key={index}>
            <a href={url}>
              {title}
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

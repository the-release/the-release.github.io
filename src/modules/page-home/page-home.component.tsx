import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Category } from "../../services/category/category.entity";

export interface PageHomeProps {
  articles: Article[];
  categories: Category[];
}

export const PageHome: FC<PageHomeProps> = ({ articles, categories }) => {
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
        <Heading component="h1">The release</Heading>
        <Heading>Categories</Heading>
        {categories.map(({ name, slug }, index) => (
          <React.Fragment key={index}>
            <a href={`/category/${slug}`}>{name}</a>
            <br />
          </React.Fragment>
        ))}
        <Heading>Latest Articles</Heading>
        {articles.map(({ title, slug, thumbnail }, index) => (
          <React.Fragment key={index}>
            <a href={`/article/${slug}`}>
              <Heading component="h2" variant="h4">
                {title}
              </Heading>
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

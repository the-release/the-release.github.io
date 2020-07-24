import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Category } from "../../services/category/category.entity";
import { Author } from "../../services/author/author.entity";
import { SITE_NAME } from "../../config";

export interface PageHomeProps {
  articles: Article[];
  categories: Category[];
  authors: Author[];
}

export const PageHome: FC<PageHomeProps> = ({
  articles,
  categories,
  authors
}) => {
  return (
    <>
      <Head>
        <title>{SITE_NAME} – Web Architect</title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">{SITE_NAME}</Heading>
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
        <Heading>Categories</Heading>
        {categories.map(({ name, slug }, index) => (
          <React.Fragment key={index}>
            <a href={`/category/${slug}`}>{name}</a>
            <br />
          </React.Fragment>
        ))}
        <Heading>Authors</Heading>
        {authors.map(({ name, slug }, index) => (
          <React.Fragment key={index}>
            <a href={`/author/${slug}`}>{name}</a>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

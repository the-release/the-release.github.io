import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { SITE_NAME, SLOGAN } from "../../config";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";

export interface PageHomeProps {
  articles: Pick<Article, "title" | "url" | "thumbnail" | "coverImageAlt">[];
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
        <title>
          {SITE_NAME} – {SLOGAN}
        </title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">{SITE_NAME}</Heading>
        <Heading>Latest Articles</Heading>
        <ArticleList>
          {articles.map((props, index) => (
            <ArticleCard {...props} key={index} />
          ))}
        </ArticleList>
        <Heading>Categories</Heading>
        {categories.map(({ name, url }, index) => (
          <React.Fragment key={index}>
            <a href={url}>{name}</a>
            <br />
          </React.Fragment>
        ))}
        <Heading>Authors</Heading>
        {authors.map(({ name, url }, index) => (
          <React.Fragment key={index}>
            <a href={url}>{name}</a>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

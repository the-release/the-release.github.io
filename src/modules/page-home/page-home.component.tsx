import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Category } from "../../services/category/category.entity";
import { Author } from "../../services/author/author.entity";
import { SITE_NAME, SLOGAN } from "../../config";
import { Image } from "../../catalog/image/image.component";

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
        {articles.map(({ title, url, thumbnail, coverImageAlt }, index) => (
          <React.Fragment key={index}>
            <a href={url}>
              <Heading component="h2" variant="h4">
                {title}
              </Heading>
              <br />
              <Image alt={coverImageAlt} src={thumbnail} />
            </a>
            <br />
          </React.Fragment>
        ))}
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

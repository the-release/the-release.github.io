import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Category } from "../../services/category/category.entity";
import { Image } from "../../catalog/image/image.component";
import { SITE_NAME } from "../../config";

export interface PageCategoryProps {
  articles: Pick<Article, "title" | "url" | "thumbnail" | "coverImageAlt">[];
  category: Category;
}

export const PageCategory: FC<PageCategoryProps> = ({ articles, category }) => {
  return (
    <>
      <Head>
        <title>
          {category.name} – {SITE_NAME}
        </title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">{category.name}</Heading>
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
      </Layout>
    </>
  );
};

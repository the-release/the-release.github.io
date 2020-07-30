import React, { FC } from "react";
import Head from "next/head";
import Link from "next/link";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { SITE_NAME } from "../../config";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";

export interface PageCategoryProps {
  articles: Pick<Article, "title" | "url" | "thumbnail" | "coverImageAlt">[];
  category: Category;
  previousPageIndex: number | null;
  nextPageIndex: number | null;
}

export const PageCategory: FC<PageCategoryProps> = ({
  articles,
  category,
  previousPageIndex,
  nextPageIndex
}) => {
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
        <ArticleList>
          {articles.map((props, index) => (
            <ArticleCard {...props} key={index} />
          ))}
        </ArticleList>
        {previousPageIndex !== null && (
          <Link
            href="/category/[slug]/[page]"
            as={`${category.url}/${previousPageIndex}`}
          >
            <a>Previous page</a>
          </Link>
        )}
        {nextPageIndex !== null && (
          <Link
            href="/category/[slug]/[page]"
            as={`${category.url}/${nextPageIndex}`}
          >
            <a>Next page</a>
          </Link>
        )}
      </Layout>
    </>
  );
};

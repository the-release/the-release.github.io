import React, { FC } from "react";
import Link from "next/link";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { SITE_NAME } from "../../config";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { MetaTags } from "../../catalog/meta-tags.component";

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
      <MetaTags contentType="homepage" />
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
            <Link href="/category/[slug]" as={url}>
              <a>{name}</a>
            </Link>
            <br />
          </React.Fragment>
        ))}
        <Heading>Authors</Heading>
        {authors.map(({ name, url }, index) => (
          <React.Fragment key={index}>
            <Link href="/author/[slug]" as={url}>
              <a>{name}</a>
            </Link>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

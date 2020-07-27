import React, { FC } from "react";
import Head from "next/head";

import { SITE_NAME } from "../../config";
import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";
import { Author } from "../../services/author/author.entity";
import { Image } from "../../catalog/image/image.component";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../../article-list/article-list.component";

export interface PageAuthorProps {
  articles: Pick<Article, "title" | "url" | "thumbnail" | "coverImageAlt">[];
  author: Author;
  previousPageIndex: number | null;
  nextPageIndex: number | null;
}

export const PageAuthor: FC<PageAuthorProps> = ({
  articles,
  author,
  previousPageIndex,
  nextPageIndex
}) => {
  return (
    <>
      <Head>
        <title>
          {author.name} – {SITE_NAME}
        </title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">
          <Image alt={`A photo of ${author.name}`} src={author.thumbnail} />
          {author.name}
        </Heading>
        <ArticleList>
          {articles.map((props, index) => (
            <ArticleCard {...props} key={index} />
          ))}
        </ArticleList>
        {previousPageIndex !== null && (
          <a href={`${author.url}/${previousPageIndex}`}>Previous page</a>
        )}
        {nextPageIndex !== null && (
          <a href={`${author.url}/${nextPageIndex}`}>Next page</a>
        )}
      </Layout>
    </>
  );
};

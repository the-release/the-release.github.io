import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { ArticleMeta } from "../../catalog/article-meta/article-meta.component";
import { Article } from "../../services/article/article.entity";

export interface PageArticleProps {
  article: Article;
}

export const PagePost: FC<PageArticleProps> = ({
  article: {
    title,
    description,
    coverImageUrl,
    creationDate,
    category,
    htmlContent
  }
}) => {
  return (
    <>
      <Head>
        <title>{title} | The Follower</title>

        <meta name="author" content="Adam Rogers" />
        <meta name="description" content={description} />
        <meta name="content-type" content="article" />
        {coverImageUrl && <meta property="og:image" content={coverImageUrl} />}
        <meta property="og:site_name" content="Wired" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.wired.com/story/hydroxychloroquine-still-doesnt-do-anything-new-data-shows/"
        />
      </Head>
      <Layout>
        <ArticleMeta creationDate={creationDate} category={category} />
        <Markdown>{htmlContent}</Markdown>
      </Layout>
    </>
  );
};

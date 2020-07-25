import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { ArticleMetadata } from "./article-metadata/article-metadata.component";
import { Article } from "../../services/article/article.entity";
import { SITE_NAME } from "../../config";

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
    author,
    htmlContent,
    readingTime,
    url
  }
}) => {
  return (
    <>
      <Head>
        <title>
          {title} | {SITE_NAME}
        </title>

        <meta name="author" content={author.name} />
        <meta name="description" content={description} />
        <meta name="content-type" content="article" />
        <meta property="og:image" content={coverImageUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {/* TODO: store canonical url in article entity */}
        <meta property="og:url" content={url} />
      </Head>
      <Layout>
        <ArticleMetadata
          creationDate={creationDate}
          category={category}
          author={author}
          readingTime={readingTime}
        />
        <Markdown>{htmlContent}</Markdown>
      </Layout>
    </>
  );
};

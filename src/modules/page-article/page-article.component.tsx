import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { ArticleMetadata } from "./article-metadata/article-metadata.component";
import { Article } from "../../services/article/article.entity";
import { ORIGIN, SITE_NAME, TWITTER_HANDLE } from "../../config";

export interface PageArticleProps {
  article: Pick<
    Article,
    | "title"
    | "description"
    | "coverImageUrl"
    | "creationDate"
    | "category"
    | "author"
    | "htmlContent"
    | "readingTime"
    | "url"
  >;
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
        <meta property="og:url" content={url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content={TWITTER_HANDLE} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:domain" content={ORIGIN} />
        <meta property="twitter:image:src" content={coverImageUrl} />
        <meta property="twitter:site" content={TWITTER_HANDLE} />
        <meta property="twitter:title" content={title} />
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

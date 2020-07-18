import React, { FC } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { PageArticleProps } from "./page-article";

export const PagePost: FC<PageArticleProps> = ({ htmlContent, metadata }) => {
  return (
    <>
      <Head>
        <title>{metadata.title} | The Follower</title>

        <meta name="author" content="Adam Rogers" />
        <meta name="description" content={metadata.description} />
        <meta name="content-type" content="article" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:site_name" content="Wired" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.wired.com/story/hydroxychloroquine-still-doesnt-do-anything-new-data-shows/"
        />
      </Head>
      <Layout>
        <div>{metadata.creationDate}</div>
        <Markdown>{htmlContent}</Markdown>
      </Layout>
    </>
  );
};

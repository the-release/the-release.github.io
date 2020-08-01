import Head from "next/head";
import React, { FC } from "react";
import { ORIGIN, SITE_NAME, SLOGAN, TWITTER_HANDLE } from "../config";

interface MetaTagsProps {
  title?: string;
  description?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultValues = {
  title: `${SITE_NAME} – ${SLOGAN}`,
  description: SLOGAN,
  image: "" // TODO: add default open graph image
};

export const MetaTags: FC<MetaTagsProps> = props => {
  const { title, description, image, author, url, type } = {
    ...defaultValues,
    ...props
  };

  return (
    <Head>
      <title>{props.title ? `${title} – ${SITE_NAME}` : title}</title>
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}
      {type && <meta name="content-type" content={type} />}

      <meta name="theme-color" content="#1b1b1b" />
      <link rel="icon" href="/favicon-v1.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-v1.png" />

      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {type && <meta property="og:type" content={type} />}
      {url && <meta property="og:url" content={url} />}

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={TWITTER_HANDLE} />
      <meta property="twitter:domain" content={ORIGIN} />
      <meta property="twitter:image:src" content={image} />
      <meta property="twitter:site" content={TWITTER_HANDLE} />
    </Head>
  );
};

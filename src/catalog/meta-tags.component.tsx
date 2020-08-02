import Head from "next/head";
import React, { FC } from "react";
import {
  DEFAULT_SOCIAL_IMAGE,
  ORIGIN,
  SITE_NAME,
  SLOGAN,
  TWITTER_HANDLE
} from "../config";

interface MetaTagsProps {
  title: string;
  description?: string;
  author?: string;
  image?: string;
  url?: string;
  contentType?: "homepage" | "article" | "contributor" | "category";
  ogType?: "website" | "article";
  keywords?: string;
}

const defaultValues = {
  description: SLOGAN,
  image: DEFAULT_SOCIAL_IMAGE, // TODO: add default social image
  ogType: "website"
};

export const MetaTags: FC<MetaTagsProps> = props => {
  const {
    title,
    description,
    image,
    author,
    url,
    contentType,
    ogType,
    keywords
  } = {
    ...defaultValues,
    ...props
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}
      {contentType && <meta name="content-type" content={contentType} />}

      <meta name="theme-color" content="#1b1b1b" />
      <link rel="icon" href="/favicon-v1.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-v1.png" />

      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {url && <meta property="og:url" content={url} />}

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={TWITTER_HANDLE} />
      <meta property="twitter:domain" content={ORIGIN} />
      <meta property="twitter:image:src" content={image} />
      <meta property="twitter:site" content={TWITTER_HANDLE} />

      {keywords && <meta name="keywords" content={keywords} />}
      {keywords && <meta name="news_keywords" content={keywords} />}
    </Head>
  );
};

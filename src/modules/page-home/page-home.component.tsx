import React, { FC, useEffect, useState } from "react";
import Head from "next/head";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../services/article/article.entity";

export interface PageHomeProps {
  articles: Article[];
}

export const PageHome: FC<PageHomeProps> = ({ articles }) => {
  const [shouldShowUnderscore, setShouldShowUnderscore] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setShouldShowUnderscore(shouldShowUnderscore => !shouldShowUnderscore);
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <title>Etienne Martin – Web Architect</title>
        <meta
          name="description"
          key="description"
          content="A personal website, because apparently I need one."
        />
      </Head>
      <Layout>
        <Heading component="h1">
          I make computers
          <br />
          go brrrrrr{shouldShowUnderscore && "_"}
        </Heading>
        {articles.map(({ slug, thumbnail }, index) => (
          <React.Fragment key={index}>
            <a href={`/article/${slug}`}>
              {slug}
              <br />
              {thumbnail && <img src={thumbnail} />}
            </a>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

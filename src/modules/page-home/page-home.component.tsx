import React, { FC, useEffect, useState } from "react";
import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import Head from "next/head";
import { Article } from "../../services/articles/article.entity";

interface PageHomeProps {
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
        {articles.map(({ slug }, index) => (
          <React.Fragment key={index}>
            <a href={`/article/${slug}`}>{slug}</a>
            <br />
          </React.Fragment>
        ))}
      </Layout>
    </>
  );
};

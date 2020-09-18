import React, { FC } from "react";
import Link from "next/link";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { ArticleCard } from "../article-card/article-card.component";
import { MetaTags } from "../../catalog/meta-tags.component";
import { ArticleGrid } from "./article-grid/article-grid.component";
import styled, { css } from "styled-components";
import { SLOGAN } from "../../config";

export interface PageHomeProps {
  articles: Pick<
    Article,
    "title" | "description" | "url" | "thumbnailUrl" | "coverImageAlt"
  >[];
  categories: Category[];
  authors: Author[];
}

function shuffle(array: any) {
  return array.sort(() => Math.random() - 0.5);
}

const Title = styled(Heading)(
  ({ theme }) => css`
    font-size: 24px;
    height: 18vw;
    min-height: 200px;
    margin-bottom: 30px;
    font-family: ${theme.fonts.serif};
    font-weight: normal;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

export const PageHome: FC<PageHomeProps> = ({
  articles,
  categories,
  authors
}) => {
  return (
    <>
      <MetaTags contentType="homepage" />
      <Layout>
        <Title component="h1" align="center">
          {SLOGAN}
        </Title>
        <ArticleGrid>
          {shuffle([...articles, ...articles, ...articles])
            .slice(0, 16)
            .map((props: any, index: any) => (
              <ArticleCard {...props} key={index} />
            ))}
        </ArticleGrid>
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

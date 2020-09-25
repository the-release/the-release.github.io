import React, { FC } from "react";
// import Link from "next/link";

import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { ArticleCard } from "../article-card/article-card.component";
import { MetaTags } from "../../catalog/meta-tags.component";
import styled, { css } from "styled-components";
import { SLOGAN } from "../../config";
import { ArticleList } from "../article-list/article-list.component";
import { ArticleHeroCard } from "../article-hero-card/article-hero-card.component";

export interface PageHomeProps {
  articles: Pick<
    Article,
    "title" | "lede" | "url" | "coverImage" | "category"
  >[];
  categories: Category[];
  authors: Author[];
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
  articles
  // categories,
  // authors
}) => {
  const [mostRecentArticle, ...otherArticles] = articles;

  return (
    <>
      <MetaTags contentType="homepage" />
      <ArticleHeroCard {...mostRecentArticle} />
      <ArticleList>
        {otherArticles.map((props, index) => (
          <ArticleCard {...props} key={index} />
        ))}
      </ArticleList>
      {/*
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
        */}
      <Title component="h1" align="center">
        {SLOGAN}
      </Title>
    </>
  );
};

import React, { FC } from "react";

import { Article } from "../../entities/article.entity";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { Heading } from "../../catalog/heading/heading.component";
import Link from "next/link";
import { Category } from "../../entities/category.entity";
import styled from "styled-components";

export interface ArticleSuggestionsProps {
  category: Category;
  nextArticles: Pick<Article, "title" | "lede" | "url" | "coverImage">[];
}

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0 -1px 0;
  padding: 30px 0;
  margin-top: 30px;
`;

export const ArticleSuggestions: FC<ArticleSuggestionsProps> = ({
  category,
  nextArticles
}) => {
  return (
    <>
      {!!nextArticles.length && (
        <Container>
          <Heading component="h3" variant="h3" gutterBottom>
            More news about{" "}
            <Link href="/category/[slug]" as={category.url}>
              <a>{category.name}</a>
            </Link>
          </Heading>
          <ArticleList>
            {nextArticles.map((props, index) => (
              <ArticleCard {...props} key={index} />
            ))}
          </ArticleList>
        </Container>
      )}
    </>
  );
};

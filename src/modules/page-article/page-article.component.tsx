import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { ArticleMarkdown } from "../article-markdown/article-markdown.component";
import { ArticleMetadata } from "../article-metadata/article-metadata.component";
import { Article } from "../../entities/article.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { Heading } from "../../catalog/heading/heading.component";
import Link from "next/link";
import styled from "styled-components";

export interface PageArticleProps {
  article: Pick<
    Article,
    | "title"
    | "lede"
    | "images"
    | "publishedAt"
    | "category"
    | "author"
    | "htmlContent"
    | "readingTime"
    | "absoluteUrl"
    | "keywords"
  >;
  nextArticles: Pick<Article, "title" | "lede" | "url" | "images">[];
}

const ArticleContainer = styled.article`
  max-width: 688px;
  margin: 0 auto;
`;

export const PagePost: FC<PageArticleProps> = ({
  article: {
    title,
    lede,
    images,
    publishedAt,
    category,
    author,
    htmlContent,
    readingTime,
    absoluteUrl,
    keywords
  },
  nextArticles
}) => {
  const [coverImage] = images;

  return (
    <>
      <MetaTags
        title={`${title} – ${SITE_NAME}`}
        description={lede}
        author={author.name}
        image={coverImage.sizes.large.absoluteUrl}
        imageAlt={coverImage.alt}
        url={absoluteUrl}
        contentType="article"
        ogType="article"
        keywords={keywords}
      />
      <Layout>
        <ArticleContainer>
          <ArticleMetadata
            publishedAt={publishedAt}
            category={category}
            author={author}
            readingTime={readingTime}
          />
          <ArticleMarkdown>{htmlContent}</ArticleMarkdown>
        </ArticleContainer>
        {!!nextArticles.length && (
          <>
            <Heading component="h3" variant="h2" gutterBottom>
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
          </>
        )}
      </Layout>
    </>
  );
};

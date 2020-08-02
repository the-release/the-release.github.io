import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { ArticleMetadata } from "../article-metadata/article-metadata.component";
import { Article } from "../../entities/article.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { Heading } from "../../catalog/heading/heading.component";
import Link from "next/link";

export interface PageArticleProps {
  article: Pick<
    Article,
    | "title"
    | "description"
    | "coverImageUrl"
    | "publishedAt"
    | "category"
    | "author"
    | "htmlContent"
    | "readingTime"
    | "absoluteUrl"
  >;
  nextArticles: Pick<
    Article,
    "title" | "url" | "thumbnail" | "coverImageAlt"
  >[];
}

export const PagePost: FC<PageArticleProps> = ({
  article: {
    title,
    description,
    coverImageUrl,
    publishedAt,
    category,
    author,
    htmlContent,
    readingTime,
    absoluteUrl
  },
  nextArticles
}) => {
  return (
    <>
      <MetaTags
        title={`${title} – ${SITE_NAME}`}
        description={description}
        author={author.name}
        image={coverImageUrl}
        url={absoluteUrl}
        contentType="article"
        ogType="article"
      />
      <Layout>
        <article>
          <ArticleMetadata
            publishedAt={publishedAt}
            category={category}
            author={author}
            readingTime={readingTime}
          />
          <Markdown>{htmlContent}</Markdown>
          <footer>
            <Heading component="h3" variant="h4" gutterBottom>
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
          </footer>
        </article>
      </Layout>
    </>
  );
};

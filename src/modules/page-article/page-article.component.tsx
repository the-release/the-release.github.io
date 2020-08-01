import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { Markdown } from "../../catalog/markdown/markdown.component";
import { ArticleMetadata } from "../article-metadata/article-metadata.component";
import { Article } from "../../entities/article.entity";
import { MetaTags } from "../../catalog/meta-tags.component";

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
  }
}) => {
  return (
    <>
      <MetaTags
        title={title}
        description={description}
        author={author.name}
        image={coverImageUrl}
        url={absoluteUrl}
        type="article"
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
        </article>
      </Layout>
    </>
  );
};

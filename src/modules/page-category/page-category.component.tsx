import React, { FC } from "react";
import Link from "next/link";

import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Category } from "../../entities/category.entity";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";

export interface PageCategoryProps {
  articles: Pick<Article, "title" | "url" | "thumbnail" | "coverImageAlt">[];
  category: Category;
  previousPageIndex: number | null;
  nextPageIndex: number | null;
}

export const PageCategory: FC<PageCategoryProps> = ({
  articles,
  category,
  previousPageIndex,
  nextPageIndex
}) => {
  return (
    <>
      <MetaTags
        title={`News About ${category.name}: ${category.keywords} – ${SITE_NAME}`}
        keywords={category.keywords}
        url={category.absoluteUrl}
        contentType="category"
      />
      <Layout>
        <Heading component="h1">{category.name}</Heading>
        <ArticleList>
          {articles.map((props, index) => (
            <ArticleCard {...props} key={index} />
          ))}
        </ArticleList>
        {previousPageIndex !== null && (
          <Link
            href="/category/[slug]/[page]"
            as={`${category.url}/${previousPageIndex}`}
          >
            <a rel="prev">Previous page</a>
          </Link>
        )}
        {nextPageIndex !== null && (
          <Link
            href="/category/[slug]/[page]"
            as={`${category.url}/${nextPageIndex}`}
          >
            <a rel="next">Next page</a>
          </Link>
        )}
      </Layout>
    </>
  );
};

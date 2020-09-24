import React, { FC } from "react";
import Link from "next/link";

import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Author } from "../../entities/author.entity";
import { Image } from "../../catalog/image/image.component";
import { ArticleCard } from "../article-card/article-card.component";
import { ArticleList } from "../article-list/article-list.component";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";

export interface PageAuthorProps {
  articles: Pick<Article, "title" | "lede" | "url" | "coverImage">[];
  author: Author;
  previousPageIndex: number | null;
  nextPageIndex: number | null;
}

export const PageAuthor: FC<PageAuthorProps> = ({
  articles,
  author,
  previousPageIndex,
  nextPageIndex
}) => {
  return (
    <>
      <MetaTags
        title={`${author.name} – ${SITE_NAME}`}
        contentType="contributor"
      />
      <Heading component="h1">
        <Image
          alt={author.image.alt}
          src={author.image.sizes["100"].url}
          srcSet={author.image.sizes}
          sizes="100px"
          dominantColor={author.image.dominantColor}
          width={100}
          height={100}
        />
        {author.name}
      </Heading>
      <ArticleList>
        {articles.map((props, index) => (
          <ArticleCard {...props} key={index} />
        ))}
      </ArticleList>
      {previousPageIndex !== null && (
        <Link
          href="/author/[slug]/[page]"
          as={`${author.url}/${previousPageIndex}`}
        >
          <a rel="prev">Previous page</a>
        </Link>
      )}
      {nextPageIndex !== null && (
        <Link
          href="/author/[slug]/[page]"
          as={`${author.url}/${nextPageIndex}`}
        >
          <a rel="next">Next page</a>
        </Link>
      )}
    </>
  );
};

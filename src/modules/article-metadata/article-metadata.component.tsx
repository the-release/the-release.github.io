import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { Image } from "../../catalog/image/image.component";

interface ArticleMetadataProps {
  publishedAt: string;
  category: Category;
  author: Author;
  readingTime: string;
}

const StyledContainer = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

export const ArticleMetadata: FC<ArticleMetadataProps> = ({
  publishedAt,
  category,
  author,
  readingTime
}) => {
  return (
    <StyledContainer>
      {publishedAt} •{" "}
      <Link href="/category/[slug]" as={category.url}>
        <a>{category.name}</a>
      </Link>{" "}
      •{" "}
      <Link href="/author/[slug]" as={author.url} rel="author">
        <a>
          <Image alt={`A photo of ${author.name}`} src={author.thumbnail} />
          {author.name}
        </a>
      </Link>{" "}
      • {readingTime}
    </StyledContainer>
  );
};

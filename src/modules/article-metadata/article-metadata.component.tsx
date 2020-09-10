import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Category } from "../../entities/category.entity";
import { Author } from "../../entities/author.entity";
import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Text } from "../../catalog/text/text.component";

interface ArticleMetadataProps {
  publishedAt: string;
  category: Category;
  author: Author;
  readingTime: string;
}

const StyledContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  font-size: 16px;
`;

const AuthorImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-right: 10px;
`;

export const ArticleMetadata: FC<ArticleMetadataProps> = ({
  publishedAt,
  category,
  author,
  readingTime
}) => {
  return (
    <StyledContainer>
      <Link href="/author/[slug]" as={author.url}>
        <a rel="author">
          <AuthorImage
            alt={`A photo of ${author.name}`}
            src={author.thumbnail}
          />
        </a>
      </Link>
      <div>
        <Heading component="h3">{author.name}</Heading>
        <Text component="p">
          {publishedAt} • {readingTime}
        </Text>
      </div>
      <div>
        <Link href="/category/[slug]" as={category.url}>
          <a>{category.name}</a>
        </Link>{" "}
      </div>
    </StyledContainer>
  );
};

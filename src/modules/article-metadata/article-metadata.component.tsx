import React, { FC } from "react";
import styled, { css } from "styled-components";
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
  align-items: center;
  font-size: 16px;
  justify-content: space-between;

  @media only screen and (max-width: 560px) {
    margin-bottom: 20px;
  }

  & > div {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
`;

const AuthorThumbnail = styled.a`
  margin-right: 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: block;
  }
`;

const AuthorName = styled(Heading)`
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Metadata = styled(Text)(
  ({ theme }) =>
    css`
      font-weight: normal;
      color: ${theme.colors.textTertiary};
    `
);

const CategoryLabel = styled.a(
  ({ theme }) => css`
    display: block;
    padding: 3px 5px;
    text-decoration: none;
    border-radius: 2px;
    ${theme.typography.h6};
    color: ${theme.colors.textTertiary};
    border: solid ${theme.colors.textTertiary} 1px;
    white-space: nowrap;

    &:focus,
    &:hover {
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: #fff;
    }
  `
);

export const ArticleMetadata: FC<ArticleMetadataProps> = ({
  publishedAt,
  category,
  author,
  readingTime
}) => {
  return (
    <StyledContainer>
      <div>
        <Link href="/author/[slug]" as={author.url} passHref>
          <AuthorThumbnail rel="author">
            <Image alt={`A photo of ${author.name}`} src={author.thumbnail} />
          </AuthorThumbnail>
        </Link>
        <div>
          <AuthorName component="h3" variant="h4">
            <Link href="/author/[slug]" as={author.url} passHref>
              <AuthorThumbnail rel="author">{author.name}</AuthorThumbnail>
            </Link>
          </AuthorName>
          <Metadata component="p" variant="h4">
            {publishedAt} • {readingTime}
          </Metadata>
        </div>
      </div>
      <Link href="/category/[slug]" as={category.url} passHref>
        <CategoryLabel>{category.name}</CategoryLabel>
      </Link>
    </StyledContainer>
  );
};

import React, { FC } from "react";
import styled from "styled-components";
import { Category } from "../../../services/category/category.entity";
import { Author } from "../../../services/author/author.entity";
import { Image } from "../../../catalog/image/image.component";

interface ArticleMetadataProps {
  creationDate: string;
  category: Category;
  author: Author;
  readingTime: string;
}

const StyledContainer = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

export const ArticleMetadata: FC<ArticleMetadataProps> = ({
  creationDate,
  category,
  author,
  readingTime
}) => {
  return (
    <StyledContainer>
      {creationDate} • <a href={category.url}>{category.name}</a> •{" "}
      <a href={author.url}>
        <Image alt={`A photo of ${author.name}`} src={author.thumbnail} />
        {author.name}
      </a>{" "}
      • {readingTime}
    </StyledContainer>
  );
};

import React, { FC } from "react";
import styled from "styled-components";
import { Category } from "../../../services/category/category.entity";
import { Author } from "../../../services/author/author.entity";

interface ArticleMetadataProps {
  creationDate: string;
  category: Category;
  author: Author;
}

const StyledContainer = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

export const ArticleMetadata: FC<ArticleMetadataProps> = ({
  creationDate,
  category,
  author
}) => {
  return (
    <StyledContainer>
      {creationDate} •{" "}
      <a href={`/category/${category.slug}`}>{category.name}</a> •{" "}
      <a href={`/author/${author.slug}`}>{author.name}</a>
    </StyledContainer>
  );
};

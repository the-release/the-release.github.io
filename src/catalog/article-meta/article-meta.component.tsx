import React, { FC } from "react";
import styled from "styled-components";
import { Category } from "../../services/category/category.entity";

interface ArticleMetaProps {
  creationDate: string;
  category: Category;
}

const StyledContainer = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

export const ArticleMeta: FC<ArticleMetaProps> = ({
  creationDate,
  category,
  ...otherProps
}) => {
  return (
    <StyledContainer {...otherProps}>
      {creationDate} •{" "}
      <a href={`/category/${category.slug}`}>{category.name}</a>
    </StyledContainer>
  );
};

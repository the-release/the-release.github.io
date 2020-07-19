import React, { FC } from "react";
import styled from "styled-components";

interface ArticleMetaProps {
  creationDate: string;
  category: string;
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
  return <StyledContainer {...otherProps}>{creationDate} • <a href={`/category/${category}`}>{category}</a></StyledContainer>;
};

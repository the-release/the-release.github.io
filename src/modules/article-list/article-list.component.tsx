import React, { FC } from "react";
import styled from "styled-components";

interface ArticleListProps {
  // TODO: add proper typing here
  children: any;
}

const StyledArticleList = styled.div`
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const ArticleList: FC<ArticleListProps> = ({ children }) => {
  return <StyledArticleList>{children}</StyledArticleList>;
};

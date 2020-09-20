import React, { FC } from "react";
import styled from "styled-components";

const StyledArticleList = styled.div`
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ArticleList: FC = ({ children }) => {
  return <StyledArticleList>{children}</StyledArticleList>;
};

import React, { FC } from "react";
import styled from "styled-components";

const Grid = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  & > article:nth-child(1) {
    grid-area: 1 / 2 / 2 / 4;
  }
  & > article:nth-child(2) {
    grid-area: 1 / 1 / 2 / 2;
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);

    & > article:nth-child(1) {
      grid-area: 1 / 1 / 2 / 3;
    }

    & > article:nth-child(2) {
      grid-area: auto;
    }
  }

  @media only screen and (max-width: 374px) {
    grid-template-columns: repeat(1, 1fr);

    & > article:nth-child(1) {
      grid-area: auto;
    }
  }
`;

export const ArticleGrid: FC = ({ children }) => {
  return <Grid>{children}</Grid>;
};

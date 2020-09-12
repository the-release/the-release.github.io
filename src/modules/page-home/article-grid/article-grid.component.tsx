import React, { FC } from "react";
import styled from "styled-components";

const Grid = styled.div`
  margin: 0 auto;
  max-width: 1600px;

  column-gap: 30px;
  column-rule: 1px solid #eee;
  column-count: 5;
  column-width: 240px;

  article {
    page-break-inside: avoid;
    break-inside: avoid;
  }
`;

export const ArticleGrid: FC = ({ children }) => {
  return <Grid>{children}</Grid>;
};

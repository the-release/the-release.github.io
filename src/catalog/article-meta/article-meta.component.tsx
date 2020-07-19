import React, { FC } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

export const ArticleMeta: FC = ({ children, ...otherProps }) => {
  return <StyledContainer {...otherProps}>{children}</StyledContainer>;
};

import React, { FC } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
`;

export const Container: FC = ({ children, ...otherProps }) => {
  return <StyledContainer {...otherProps}>{children}</StyledContainer>;
};

import React, { FC } from "react";
import styled from "styled-components";
import { Text } from "../../catalog/text/text.component";

const StyledFooter = styled.footer`
  background: #000;
  flex-grow: 1;
  padding: 30px 40px;

  p {
    color: #fff !important;
  }
`;

export const Footer: FC = ({ ...otherProps }) => {
  return (
    <StyledFooter {...otherProps}>
      <Text component="p">This is a footer</Text>
    </StyledFooter>
  );
};

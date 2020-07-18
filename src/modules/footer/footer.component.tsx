import React, { FC } from "react";
import styled from "styled-components";
import { Text } from "../../catalog/text/text.component";

const StyledFooter = styled.footer``;

export const Footer: FC = ({ ...otherProps }) => {
  return (
    <StyledFooter {...otherProps}>
      <Text component="p">This is a footer</Text>
    </StyledFooter>
  );
};

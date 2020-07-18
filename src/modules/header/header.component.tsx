import React, { FC } from "react";
import styled from "styled-components";
import { Heading } from "../../catalog/heading/heading.component";

const StyledHeader = styled.header``;

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Heading component="h2" variant="h4">
        The Array
      </Heading>
    </StyledHeader>
  );
};

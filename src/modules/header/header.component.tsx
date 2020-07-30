import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Heading } from "../../catalog/heading/heading.component";
import { SITE_NAME } from "../../config";

const StyledHeader = styled.header``;

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Heading component="h2" variant="h4">
        <Link href="/">
          <a>{SITE_NAME}</a>
        </Link>
      </Heading>
    </StyledHeader>
  );
};

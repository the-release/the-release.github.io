import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { SITE_NAME } from "../../config";
import { Hamburger } from "../../catalog/hamburger/hamburger.component";

const StyledHeader = styled.header`
  padding: 20px 40px;
  border-bottom: solid #eee 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 375px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }

  img {
    display: block;
  }
`;

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <img src="/the-release-logo.svg" alt={`${SITE_NAME}'s Logo`} />
        </a>
      </Link>
      <Hamburger />
    </StyledHeader>
  );
};

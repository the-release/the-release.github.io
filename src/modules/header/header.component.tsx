import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { MainMenu } from "../main-menu/main-menu.component";
import { Logo } from "../logo/logo.component";

const StyledHeader = styled.header`
  padding: 20px 40px;
  border-bottom: solid #eee 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 560px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }

  svg {
    display: block;
  }
`;

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <MainMenu />
    </StyledHeader>
  );
};

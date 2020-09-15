import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { MainMenu } from "../main-menu/main-menu.component";
import { Logo } from "../logo/logo.component";

const StyledHeader = styled.header`
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 1px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;

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

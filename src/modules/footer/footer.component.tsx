import React, { FC } from "react";
import styled from "styled-components";
import { Text } from "../../catalog/text/text.component";
import Link from "next/link";
import { SITE_NAME } from "../../config";

const StyledFooter = styled.footer`
  flex-grow: 1;
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 -1px 0;

  @media only screen and (max-width: 560px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  display: flex;
  padding: 0 40px;
`;

export const Footer: FC = ({ ...otherProps }) => {
  return (
    <StyledFooter {...otherProps}>
      <Container>
        <Text component="p">Readers must be 18+</Text>
        <Link href="/[...slug]" as="/about">
          <a>About</a>
        </Link>
        <Link href="/[...slug]" as="/terms">
          <a>Terms</a>
        </Link>
        <Link href="/[...slug]" as="/privacy">
          <a>Privacy</a>
        </Link>
        <Text component="p">© 2020 {SITE_NAME}</Text>
      </Container>
    </StyledFooter>
  );
};

import React, { FC } from "react";
import Head from "next/head";
import styled from "styled-components";

import { Header } from "../header/header.component";
import { Footer } from "../footer/footer.component";
import { NoScript } from "../noscript/noscript.component";

const Main = styled.main`
  padding: 30px 40px;
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;

  @media only screen and (max-width: 560px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }
`;

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <NoScript />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

import React, { FC } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer/footer.component";
import styled from "styled-components";

const Main = styled.main`
  padding: 20px 40px;

  @media only screen and (max-width: 375px) {
    padding: 20px 30px;
  }

  @media only screen and (max-width: 320px) {
    padding: 20px;
  }
`;

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

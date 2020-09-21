import React, { FC } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer/footer.component";
import styled from "styled-components";

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
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

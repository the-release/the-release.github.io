import React, { FC } from "react";
import styled from "styled-components";
import { Header } from "../header/header.component";
import { Footer } from "../footer/footer.component";

const StyledLayout = styled.div`
  min-height: 100%;
  display: flex;
  flex-flow: column;
  padding: 75px 100px;

  @media only screen and (max-width: 1080px) {
    padding: 30px 40px;
  }

  @media only screen and (max-width: 375px) {
    padding: 30px 35px;
  }

  @media only screen and (max-width: 320px) {
    padding: 30px;
  }
`;

const Content = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 60px 0;
`;

export const Layout: FC = ({ children, ...otherProps }) => {
  return (
    <StyledLayout {...otherProps}>
      <Header />
      <Content>
        <div>{children}</div>
      </Content>
      <Footer />
    </StyledLayout>
  );
};

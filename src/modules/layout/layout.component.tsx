import React, { FC } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer/footer.component";

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../styles/theme";
import { Layout } from "../modules/layout/layout.component";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

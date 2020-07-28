import React, { FC } from "react";
import Head from "next/head";
import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";

export const PageNotFound: FC = () => {
  return (
    <>
      <Head>
        <title>404 – Page Not Found</title>
      </Head>
      <Layout>
        <Heading component="h1">404 Not Found</Heading>
      </Layout>
    </>
  );
};

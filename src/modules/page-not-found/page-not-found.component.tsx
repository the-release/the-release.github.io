import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";

const Video = styled.video`
  position: fixed;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
`;

export const PageNotFound: FC = () => {
  const [shouldShowUnderscore, setShouldShowUnderscore] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setShouldShowUnderscore(shouldShowUnderscore => !shouldShowUnderscore);
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <title>404 – Page Not Found</title>
      </Head>
      <Video src="/404.mp4" autoPlay muted loop playsInline />
      <Layout>
        <Heading component="h1">
          404 Not Found{shouldShowUnderscore && "_"}
        </Heading>
      </Layout>
    </>
  );
};

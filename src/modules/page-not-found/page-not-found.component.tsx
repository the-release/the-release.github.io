import React, { FC } from "react";
import { Layout } from "../layout/layout.component";
import { Heading } from "../../catalog/heading/heading.component";
import { MetaTags } from "../../catalog/meta-tags.component";

export const PageNotFound: FC = () => {
  return (
    <>
      <MetaTags title={`404 Not Found`} />
      <Layout>
        <Heading component="h1">404 Not Found</Heading>
      </Layout>
    </>
  );
};

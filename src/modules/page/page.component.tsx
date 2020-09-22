import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { Page } from "../../entities/page.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";
import { Markdown } from "../markdown/markdown.component";
import styled from "styled-components";

export interface PageProps {
  page: Pick<Page, "htmlContent" | "title">;
}

const PageContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 30px 0;
`;

export const PageComponent: FC<PageProps> = ({
  page: { htmlContent, title }
}) => {
  return (
    <>
      <MetaTags title={`${title} – ${SITE_NAME}`} />
      <Layout>
        <PageContainer>
          <Markdown>{htmlContent}</Markdown>
        </PageContainer>
      </Layout>
    </>
  );
};

import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { Page } from "../../entities/page.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";
import { Markdown } from "../markdown/markdown.component";

export interface PageProps {
  page: Pick<Page, "htmlContent" | "title">;
}

export const PageComponent: FC<PageProps> = ({
  page: { htmlContent, title }
}) => {
  return (
    <>
      <MetaTags title={`${title} – ${SITE_NAME}`} />
      <Layout>
        <Markdown>{htmlContent}</Markdown>
      </Layout>
    </>
  );
};

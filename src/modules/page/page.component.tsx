import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { Page } from "../../entities/page.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";
import { Markdown } from "../markdown/markdown.component";

export interface PageProps {
  page: Pick<Page, "htmlContent">;
}

export const PagePage: FC<PageProps> = ({ page: { htmlContent } }) => {
  return (
    <>
      {/* TODO: extract page title from markdown */}
      <MetaTags title={`About – ${SITE_NAME}`} />
      <Layout>
        <Markdown>{htmlContent}</Markdown>
      </Layout>
    </>
  );
};

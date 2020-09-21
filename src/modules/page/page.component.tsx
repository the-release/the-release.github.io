import React, { FC } from "react";

import { Layout } from "../layout/layout.component";
import { ArticleMarkdown } from "../article-markdown/article-markdown.component";
import { Page } from "../../entities/page.entity";
import { MetaTags } from "../../catalog/meta-tags.component";
import { SITE_NAME } from "../../config";

export interface PageProps {
  page: Pick<Page, "htmlContent">;
}

export const PagePage: FC<PageProps> = ({ page: { htmlContent } }) => {
  return (
    <>
      <MetaTags title={`About – ${SITE_NAME}`} />
      <Layout>
        <ArticleMarkdown>{htmlContent}</ArticleMarkdown>
      </Layout>
    </>
  );
};

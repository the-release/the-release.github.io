// Remark plugins:
// https://github.com/remarkjs/remark/blob/main/doc/plugins.md

import { promises as fs } from "fs";
import remark from "remark";
import a11yEmoji from "@fec/remark-a11y-emoji";
import remarkSlug from "remark-slug";
import remarkCapitalize from "remark-capitalize";
import remarkHtml from "remark-html";

export const parseMarkDown = async (filePath: string) => {
  const markdown = (await fs.readFile(filePath, "utf8")).trim();

  const { contents } = await remark()
    .use(a11yEmoji)
    .use(remarkSlug)
    .use(remarkCapitalize)
    .use(remarkHtml)
    .process(markdown);

  return contents.toString();
};

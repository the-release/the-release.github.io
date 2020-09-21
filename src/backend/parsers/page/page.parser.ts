import path from "path";
import { promises as fs } from "fs";

import {
  exportImages,
  externalLinks,
  addImageCaptions,
  lazyLoadImages,
  makeImageResponsive
} from "./page.util";
import { ORIGIN } from "../../../config";
import { parseMarkDown } from "../markdown/markdown.parser";

const pagesDir = path.join(process.cwd(), "data", "pages");

export const getPageBySlug = async (slug: string) => {
  try {
    const pageDir = path.join(pagesDir, slug);
    const pageFilePath = path.join(pageDir, "/page.md");
    let htmlContent = await parseMarkDown(pageFilePath);

    const { html } = await exportImages(htmlContent, slug);

    htmlContent = addImageCaptions(html);
    htmlContent = lazyLoadImages(htmlContent);
    htmlContent = externalLinks(htmlContent);
    htmlContent = makeImageResponsive(htmlContent);

    return {
      url: `/${slug}`,
      absoluteUrl: `${ORIGIN}/${slug}`,
      slug,
      htmlContent
    };
  } catch (err) {
    console.error(
      "Error:",
      err?.message || "An unexpected error occurred while parsing the page"
    );
    console.error(`Page: ${slug}`);
    process.exit(1);
  }
};

export const getPages = async () => {
  const items = await fs.readdir(pagesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await getPageBySlug(slug);
    })
  );
};

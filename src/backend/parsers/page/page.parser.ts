import path from "path";
import { promises as fs } from "fs";

import { ORIGIN } from "../../../config";
import { parseMarkDown } from "../../utils/markdown";
import { exportImages } from "../../utils/image-export";
import { addImageCaptions } from "../../utils/image-caption";
import { lazyLoadImages } from "../../utils/image-lazy-load";
import { makeImageResponsive } from "../../utils/image-responsive";
import { titleSelector } from "./page.selector";

const pagesDir = path.join(process.cwd(), "data", "pages");

const parsePage = async (slug: string) => {
  try {
    const pageDir = path.join(pagesDir, slug);
    const pageFilePath = path.join(pageDir, "/page.md");
    let htmlContent = await parseMarkDown(pageFilePath);

    const { html } = await exportImages(htmlContent, pageDir);

    htmlContent = addImageCaptions(html);
    htmlContent = lazyLoadImages(htmlContent);
    htmlContent = makeImageResponsive(htmlContent);

    return {
      url: `/${slug}`,
      absoluteUrl: `${ORIGIN}/${slug}`,
      slug,
      htmlContent,
      title: titleSelector(htmlContent)
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

export const parsePages = async () => {
  const items = await fs.readdir(pagesDir, { withFileTypes: true });
  const folders = items.filter(item => item.isDirectory());

  return await Promise.all(
    folders.map(async ({ name }) => {
      const slug = path.parse(name).name;

      return await parsePage(slug);
    })
  );
};

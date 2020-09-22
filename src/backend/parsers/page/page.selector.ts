import cheerio from "cheerio";

export const titleSelector = (html: string) => {
  const $ = cheerio.load(html);
  const titleElement = $("body > h1:first-child");

  if (!titleElement.length) throw new Error("Missing title");

  return titleElement.text();
};

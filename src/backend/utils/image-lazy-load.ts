import cheerio from "cheerio";

export const lazyLoadImages = (html: string) => {
  const $ = cheerio.load(html);

  $("img").attr("loading", "lazy");
  $("body > h1:first-child + p + figure img").attr("loading", "eager");

  return $.html();
};

import cheerio from "cheerio";

export const stripBody = (html: string) => {
  const $ = cheerio.load(html);

  return $("body").html() || "";
};

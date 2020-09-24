import cheerio from "cheerio";

export const removeHtmlComments = (html: string) => {
  const $ = cheerio.load(html);

  $("*")
    .contents()
    .each((index, elem) => {
      if (elem.type === "comment") {
        $(elem).remove();
      }
    });

  return $.html();
};

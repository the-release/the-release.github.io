import title from "title";
import cheerio from "cheerio";

export const titleCase = (str: string) => {
  return (title as any)(str, {
    special: ["The Release"]
  });
};

export const toTitleCase = (html: string) => {
  const $ = cheerio.load(html);

  $("h1,h2,h3,h4,h5,h6").each((index, elem) => {
    const title = $(elem).text();

    $(elem).text(titleCase(title));
  });

  return $.html();
};

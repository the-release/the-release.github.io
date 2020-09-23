import cheerio from "cheerio";

export const addImageCaptions = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const captionElem = $(elem).nextAll("em, br + em");
    const caption = $(captionElem).html();

    // Unwrap image from paragraph
    $(elem)
      .parent()
      .replaceWith(elem);

    $(elem).wrap(`<figure></figure>`);

    if (!$(captionElem).length) return;

    $(elem)
      .closest("figure")
      .append(`<figcaption>${caption}</figcaption>`);

    $(captionElem).remove();
  });

  return $.html();
};

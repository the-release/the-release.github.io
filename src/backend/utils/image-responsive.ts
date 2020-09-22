import cheerio from "cheerio";
import { convertRgbToRgba } from "../../utils/rgb-to-rgba";

export const makeImageResponsive = (html: string) => {
  const $ = cheerio.load(html);

  $("img").each((index, elem) => {
    const width = parseInt($(elem).attr("width") || "0", 10);
    const height = parseInt($(elem).attr("height") || "0", 10);
    const imageRatio = (height / width) * 100;
    const dominantColor = $(elem).css("background-color");
    const dominantColorRgba = convertRgbToRgba(dominantColor, 0.5);

    $(elem).css("background-color", "");

    $(elem)
      .wrap(
        `<div style="padding-top: ${imageRatio}%; background-color: ${dominantColorRgba};"></div>`
      )
      .closest("figure")
      .css("max-width", `${width}px`);
  });

  return $.html();
};

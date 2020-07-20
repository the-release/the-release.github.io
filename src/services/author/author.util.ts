import jimp from "jimp";

export const generateThumbnail = async (src: string, dest: string) => {
  const image = await jimp.read(src);

  await image.resize(100, jimp.AUTO);
  await image.quality(60);
  await image.writeAsync(dest);
};

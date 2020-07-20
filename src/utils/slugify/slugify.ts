import _slugify from "slugify";

export const slugify = (str: string) => {
  return _slugify(str, {
    lower: true
  });
};

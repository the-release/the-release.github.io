export const isAbsoluteUrl = (url: string) => {
  return new RegExp(/^https?:\/\/|^\/\//i, "i").test(url);
};

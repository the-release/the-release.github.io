export const pick = <T extends object, U extends keyof T>(
  obj: T,
  paths: Array<U>
): Pick<T, U> => {
  return paths.reduce((o, k) => {
    o[k] = obj[k];

    return o;
  }, {} as any);
};

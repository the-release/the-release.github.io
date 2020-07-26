import { promises as fs } from "fs";

export const isFile = async (path: string) => {
  return (await fs.stat(path).catch(() => undefined))?.isFile();
};

import path from "path";
import { promises as fs } from "fs";
import { titleCase } from "title-case";

export const metadataSelector = async (
  categoryDir: string
): Promise<{
  name: string;
  keywords: string;
  description: string;
}> => {
  const metadataFilePath = path.join(categoryDir, "/metadata.json");
  const metadata = JSON.parse(await fs.readFile(metadataFilePath, "utf8"));

  if (!metadata.name?.trim()) throw new Error(`Missing name metadata`);
  if (!metadata.keywords?.trim()) throw new Error(`Missing keywords metadata`);
  if (!metadata.description?.trim()) {
    throw new Error(`Missing description metadata`);
  }

  const keywords = metadata.keywords
    .split(",")
    .map((keyword: string) => titleCase(keyword.trim()))
    .join(", ");

  return {
    ...metadata,
    keywords
  };
};

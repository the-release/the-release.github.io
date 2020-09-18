import { createConnection, getConnectionManager } from "typeorm";
import { TYPEORM_CONFIG } from "../typeorm.config";
import { Article } from "../entities/article.entity";

export const dbConnection = async () => {
  try {
    await createConnection({
      ...TYPEORM_CONFIG
    });
  } catch (err) {
    if (err.name !== "AlreadyHasActiveConnectionError") throw err;

    const connection = getConnectionManager().get("default");

    try {
      connection.getRepository(Article);
    } catch {
      await connection.close();
      await createConnection({
        ...TYPEORM_CONFIG
      });
    }
  }
};

import { createConnection } from "typeorm";
import { TYPEORM_CONFIG } from "../typeorm.config";

export const dbConnection = async () => {
  try {
    await createConnection(TYPEORM_CONFIG);
  } catch {
    // Do nothing
  }
};

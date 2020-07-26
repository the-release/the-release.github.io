import crypto from "crypto";

export const sha256 = (data: crypto.BinaryLike) => {
  const hash = crypto.createHash("sha256");

  return hash.update(data).digest("hex");
};

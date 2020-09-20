import { Image } from "../../../entities/image.entity";
import { LARGE_IMAGE_WIDTH, SMALL_IMAGE_WIDTH } from "../../../config";

export const authorImageLinter = (image: Image) => {
  if (image.sizes.large.width < SMALL_IMAGE_WIDTH) {
    throw new Error(
      `Author images must be at least ${LARGE_IMAGE_WIDTH}px wide`
    );
  }
};

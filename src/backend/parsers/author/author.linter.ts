import { Image } from "../../../entities/image.entity";
import { AUTHOR_IMAGE_MIN_WIDTH } from "../../../config";

export const authorImageLinter = (image: Image) => {
  const biggestImage = Object.values(image.sizes).slice(-1)[0];

  if (biggestImage.width < AUTHOR_IMAGE_MIN_WIDTH) {
    throw new Error(
      `Author images must be at least ${AUTHOR_IMAGE_MIN_WIDTH}px wide`
    );
  }
};

import { IMAGE_SIZES } from "../config";

export interface ImageSize {
  width: number;
  height: number;
  url: string;
  absoluteUrl: string;
}

export type ImageSizes = {
  [key in typeof IMAGE_SIZES[number]]: ImageSize;
};

export interface Image {
  alt: string;
  dominantColor: string;
  sizes: ImageSizes;
}

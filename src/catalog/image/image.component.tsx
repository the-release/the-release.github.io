import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState
} from "react";
import styled, { css } from "styled-components";

import { easeInOutQuart } from "../../styles/easing";
import { convertRgbToRgba } from "../../utils/rgb-to-rgba";
import { ImageSizes } from "../../entities/image.entity";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> {
  alt: string;
  src: string;
  width: number;
  height: number;
  dominantColor?: string;
  srcSet?: ImageSizes;
}

const ImageContainer = styled.figure<{
  imageRatio: number;
  width: number;
  height: number;
  dominantColor?: string;
}>(
  ({ imageRatio, width, height, dominantColor }) => css`
    background: ${dominantColor || "#eee"};
    display: inline-block;
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;

    /**
     * Fix Safari overflow hidden + border-radius bug
     * https://stackoverflow.com/a/16681137/1123556
     */
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);

    &:before {
      content: "";
      display: block;
      padding-top: ${imageRatio}%;
    }
  `
);

const StyledImage = styled.img<{ hasLoaded: boolean }>(
  ({ hasLoaded }) => css`
    position: absolute;
    top: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: opacity 0.25s ${easeInOutQuart};

    ${!hasLoaded &&
      css`
        opacity: 0;
      `}
  `
);

export const Image: FC<ImageProps> = ({
  alt,
  src,
  width,
  height,
  dominantColor,
  srcSet,
  className,
  ...otherProps
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const srcset = srcSet
    ? Object.values(srcSet)
        .map(({ url, width }) => `${url} ${width}w`)
        .join(", ")
    : undefined;
  const imageRatio = (height / width) * 100;
  const dominantColorRgba = dominantColor
    ? convertRgbToRgba(dominantColor, 0.5)
    : undefined;

  useEffect(() => {
    if (imageRef.current!.complete) {
      setTimeout(() => setHasLoaded(true), 1);
    }
  }, []);

  return (
    <ImageContainer
      className={className}
      imageRatio={imageRatio}
      width={width}
      height={height}
      dominantColor={dominantColorRgba}
    >
      <StyledImage
        {...otherProps}
        ref={imageRef}
        src={src}
        loading="lazy"
        alt={alt}
        onLoad={() => setHasLoaded(true)}
        hasLoaded={hasLoaded}
        srcSet={srcset}
        className={`fadeInOnLoad`}
      />
    </ImageContainer>
  );
};

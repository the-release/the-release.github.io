import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState
} from "react";
import styled, { css } from "styled-components";
import { easeInOutQuart } from "../../styles/easing";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> {
  alt: string;
  src: string;
  srcSet?: {
    src: string;
    width: number;
  }[];
}

const StyledImage = styled.img<{ hasLoaded: boolean }>(
  ({ hasLoaded }) => css`
    background: #eee;
    width: auto;
    height: auto;

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
  srcSet,
  className,
  ...otherProps
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const srcset = srcSet?.map(({ src, width }) => `${src} ${width}w`).join(", ");

  useEffect(() => {
    if (imageRef.current!.complete) {
      setTimeout(() => setHasLoaded(true), 10);
    }
  }, []);

  return (
    <StyledImage
      ref={imageRef}
      src={src}
      loading="lazy"
      alt={alt}
      {...otherProps}
      onLoad={() => setHasLoaded(true)}
      hasLoaded={hasLoaded}
      srcSet={srcset}
      className={`${className} fadeInOnLoad`}
    />
  );
};

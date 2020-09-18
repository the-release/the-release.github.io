import React, { FC, ImgHTMLAttributes } from "react";
import styled from "styled-components";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const StyledImage = styled.img`
  background: #eee;
  width: auto;
  height: auto;
`;

export const Image: FC<ImageProps> = ({ src, alt, ...otherProps }) => {
  return <StyledImage src={src} loading="lazy" alt={alt} {...otherProps} />;
};

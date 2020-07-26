import React, { FC } from "react";
import styled from "styled-components";

interface ImageProps {
  src: string;
  alt: string;
}

export const StyledImage = styled.img`
  border-radius: 5px;
  background: #eee;
  width: auto;
  height: auto;
`;

export const Image: FC<ImageProps> = ({ src, alt, ...otherProps }) => {
  return <StyledImage src={src} loading="lazy" alt={alt} {...otherProps} />;
};

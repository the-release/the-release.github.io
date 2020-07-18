import React, { FC } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

/**
 * Using the "component" props instead of the "as" prop
 * because of a bug with styled-components
 * https://github.com/artsy/palette/pull/327
 * https://github.com/styled-components/styled-components/issues/2448
 */
export interface TextProps {
  component: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  variant?: keyof typeof theme.typography;
  display?: "inline" | "block";
  align?: "left" | "center" | "right" | "justify";
  gutterBottom?: boolean;
  noWrap?: boolean;
  color?: keyof typeof theme.colors;
}

const StyledText = styled.p<Omit<TextProps, "component">>(
  ({ theme, variant, display, align, gutterBottom, noWrap, color }) => css`
    word-break: break-word;

    ${align &&
      css`
        text-align: ${align};
      `}
    
    ${display &&
      css`
        display: ${display};
      `}

    ${theme.typography[variant || "body"]};

    ${color &&
      css`
        color: ${theme.colors[color]};
      `}

    ${gutterBottom &&
      css`
        margin-bottom: 0.8em;
      `}

    ${noWrap &&
      css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
  `
);

export const Text: FC<TextProps> = ({ children, component, ...otherProps }) => {
  return (
    <StyledText as={component} {...otherProps}>
      {children}
    </StyledText>
  );
};

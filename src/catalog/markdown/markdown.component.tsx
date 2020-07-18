import React, { FC } from "react";
import styled, { css } from "styled-components";

const MarkdownContainer = styled.div(
  ({ theme }) => css`
    font-family: ${theme.fonts.serif};
    word-break: break-word;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    p,
    img {
      margin-bottom: 1em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${theme.fonts.sans};
    }

    h1 {
      font-size: 56px;
      margin-bottom: 0.8em;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 18px;
    }

    h4 {
      font-size: 16px;
    }

    img {
      width: 100%;
      height: auto;
      max-width: 960px;
    }

    ul,
    ol {
      padding: 0 20px;
    }

    /* Lede */
    h1 + p strong {
      font-family: ${theme.fonts.sans};
    }

    strong {
      color: ${theme.colors.textPrimary};
    }

    a {
      transition: color 0.25s;

      &:focus,
      &:hover {
        color: #09f;
      }
    }

    blockquote {
      padding-left: 20px;
      border-left: solid #ccc 3px;
      font-style: italic;
      font-size: 24px;
      color: #666;
    }
  `
);

export const Markdown: FC<{
  children: string;
}> = ({ children, ...otherProps }) => {
  return (
    <MarkdownContainer
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

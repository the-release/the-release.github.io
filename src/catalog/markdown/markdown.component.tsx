import React, { FC } from "react";
import styled, { css } from "styled-components";

const MarkdownContainer = styled.div(
  ({ theme }) => css`
    font-family: ${theme.fonts.serif};
    font-size: 21px;
    word-break: break-word;
    max-width: 960px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    p {
      margin-bottom: 1.6em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${theme.fonts.sans};
    }

    h1:first-child {
      font-size: 56px;
      line-height: 1em;
      margin-bottom: 0.3em;
      max-width: 960px;
    }

    /* Lede */
    h1 + p {
      strong {
        display: block;
        font-family: ${theme.fonts.sans};
        margin-bottom: 2.5em;
      }
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

    p {
      line-height: 1.6em;
    }

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      border-radius: 5px;
      background: #eee;
    }

    /* Image caption */
    figure figcaption {
      font-family: ${theme.fonts.sans};
      font-size: 14px;
      color: #666;
      line-height: 1.6em;
      font-style: italic;
    }

    ul,
    ol {
      padding: 0 20px;
    }

    strong {
      color: ${theme.colors.textPrimary};
    }

    a {
      transition: color 0.25s;

      &:focus,
      &:hover {
        color: #8a3af4;
      }
    }

    blockquote {
      padding-left: 20px;
      border-left: solid #ccc 3px;
      font-style: italic;
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

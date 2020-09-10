import React, { FC } from "react";
import styled, { css } from "styled-components";

const MarkdownContainer = styled.div(
  ({ theme }) => css`
    word-break: break-word;
    max-width: 688px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    p,
    pre code {
      margin: 1.6em 0;
    }

    h1:first-child {
      margin-top: 0;
      margin-bottom: 0.3em;
      ${theme.typography.h1};
    }

    /* Lede */
    h1 + p {
      margin: 0;
      margin-bottom: 2.5em;
      line-height: normal;

      strong {
        display: block;
        font-family: ${theme.fonts.sans};
      }
    }

    h1 {
      ${theme.typography.h1};
    }

    h2 {
      ${theme.typography.h2};
    }

    h3 {
      ${theme.typography.h3};
    }

    h4 {
      ${theme.typography.h4};
    }

    h5 {
      ${theme.typography.h6};
    }

    h6 {
      ${theme.typography.h6};
    }

    p {
      ${theme.typography.body};
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
      ${theme.typography.caption};
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

      p {
        ${theme.typography.quote};
      }
    }

    code {
      ${theme.typography.code};
    }

    pre code {
      ${theme.typography.code};
      display: block;
      padding: 20px;
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

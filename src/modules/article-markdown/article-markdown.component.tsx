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
    pre code,
    figure {
      margin: 1.8rem 0;

      ul,
      ol {
        margin: 0;
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

    h1:first-child {
      margin-top: 0;
      margin-bottom: 0.3em;
      ${theme.typography.h1};
    }

    /* Lede */
    h1 + p {
      margin-top: 0;
      line-height: 1.3em;

      strong {
        display: block;
        font-family: ${theme.fonts.sans};
      }
    }

    /* cover image */
    h1:first-child + p + figure {
      margin-left: -40px;
      margin-right: -40px;

      @media only screen and (max-width: 848px) {
        margin-left: calc(calc(calc(100vw - 688px) / 2) * -1);
        margin-right: calc(calc(calc(100vw - 688px) / 2) * -1);
      }

      @media only screen and (max-width: 768px) {
        margin-left: -40px;
        margin-right: -40px;
      }

      @media only screen and (max-width: 560px) {
        margin-left: -30px;
        margin-right: -30px;
      }

      @media only screen and (max-width: 320px) {
        margin-left: -20px;
        margin-right: -20px;
      }

      img {
        width: 100%;

        @media only screen and (max-width: 848px) {
          border-radius: 0;
        }
      }

      figcaption {
        padding: 0 40px;

        @media only screen and (max-width: 848px) {
          padding: 0 calc(calc(100vw - 688px) / 2);
        }

        @media only screen and (max-width: 768px) {
          padding: 0 40px;
        }

        @media only screen and (max-width: 560px) {
          padding: 0 30px;
        }

        @media only screen and (max-width: 320px) {
          padding: 0 20px;
        }
      }
    }

    figure img {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      background: #eee;
      border-radius: 5px;
    }

    /* Image caption */
    figure figcaption {
      margin-top: 10px;
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
      &:focus,
      &:hover {
        color: ${theme.colors.primary};
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

export const ArticleMarkdown: FC<{
  children: string;
}> = ({ children, ...otherProps }) => {
  return (
    <MarkdownContainer
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

import React, { FC } from "react";
import styled, { css } from "styled-components";
import { Markdown } from "../markdown/markdown.component";

const StyledArticleMarkdown = styled(Markdown)(
  ({ theme }) => css`
    /* Lede */
    h1 + p {
      margin-top: 0;
      line-height: 1.3em;
      margin-bottom: 1.8em;

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
  `
);

export const ArticleMarkdown: FC<{
  children: string;
}> = ({ children, ...otherProps }) => {
  return (
    <StyledArticleMarkdown {...otherProps}>{children}</StyledArticleMarkdown>
  );
};

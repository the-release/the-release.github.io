import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<
  Article,
  "title" | "lede" | "url" | "thumbnailUrl" | "coverImageAlt"
>;

const StyledArticleCard = styled.a`
  text-decoration: none;
`;

const Thumbnail = styled(Image)`
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
  display: block;
`;

const Description = styled(Text)(
  ({ theme }) => css`
    border-radius: 5px;
    font-family: ${theme.fonts.serif};
    color: ${theme.colors.textSecondary};
    font-weight: normal;
  `
);

export const ArticleCard: FC<ArticleCardProps> = ({
  title,
  lede,
  url,
  thumbnailUrl,
  coverImageAlt
}) => {
  return (
    <article>
      <Link href="/article/[slug]" as={url} passHref>
        <StyledArticleCard>
          <Heading component="h2" variant="h3" gutterBottom>
            {title}
          </Heading>
          <Description component="p" gutterBottom variant="h4">
            {lede}
          </Description>
          <Thumbnail alt={coverImageAlt} src={thumbnailUrl} />
        </StyledArticleCard>
      </Link>
    </article>
  );
};

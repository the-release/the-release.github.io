import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<
  Article,
  "title" | "description" | "url" | "thumbnail" | "coverImageAlt"
>;

const StyledArticleCard = styled.a`
  text-decoration: none;
`;

const Thumbnail = styled(Image)`
  border-radius: 5px;
  width: 100%;
  margin-bottom: 25px;
  margin-top: 5px;
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
  description,
  url,
  thumbnail,
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
            {description}
          </Description>
          <Thumbnail alt={coverImageAlt} src={thumbnail} />
        </StyledArticleCard>
      </Link>
    </article>
  );
};

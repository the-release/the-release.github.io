import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<Article, "title" | "lede" | "url" | "images">;

const StyledArticleLink = styled.a`
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  margin-bottom: 30px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Thumbnail = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  grid-area: 1 / span 2;

  @media only screen and (max-width: 768px) {
    grid-area: auto;
  }
`;

const ArticleInformation = styled.div`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 1080px) {
    padding: 30px 0;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    max-width: 560px;
  }
`;

const Title = styled(Heading)`
  margin-bottom: 0.5em;

  @media only screen and (max-width: 1600px) {
    font-size: 2.86vw;
  }

  @media only screen and (max-width: 1080px) {
    font-size: 32px;
  }
`;

const Lede = styled(Text)(
  ({ theme }) => css`
    border-radius: 5px;
    font-family: ${theme.fonts.serif};
    color: ${theme.colors.textSecondary};
    font-weight: normal;

    @media only screen and (max-width: 1080px) {
      font-size: 18px;
    }
  `
);

export const ArticleHeroCard: FC<ArticleCardProps> = ({
  title,
  lede,
  url,
  images
}) => {
  const [coverImage] = images;

  return (
    <article>
      <Link href="/article/[slug]" as={url} passHref>
        <StyledArticleLink>
          <Thumbnail
            alt={coverImage.alt}
            src={coverImage.sizes.medium.url}
            srcSet={[
              {
                src: coverImage.sizes.small.url,
                width: coverImage.sizes.small.width
              },
              {
                src: coverImage.sizes.medium.url,
                width: coverImage.sizes.medium.width
              },
              {
                src: coverImage.sizes.large.url,
                width: coverImage.sizes.large.width
              }
            ]}
            dominantColor={coverImage.dominantColor}
            width={16}
            height={9}
          />
          <ArticleInformation>
            <Heading component="h3" variant="h5" gutterBottom>
              Silicon Valley
            </Heading>
            <Title component="h2" variant="h1" gutterBottom>
              {title}
            </Title>
            <Lede component="p">{lede}</Lede>
          </ArticleInformation>
        </StyledArticleLink>
      </Link>
    </article>
  );
};

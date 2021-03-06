import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<
  Article,
  "title" | "lede" | "url" | "coverImage" | "category"
>;

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

  @media only screen and (max-width: 560px) {
    font-size: 28px;
  }
`;

const Lede = styled(Text)(
  ({ theme }) => css`
    border-radius: 5px;
    color: ${theme.colors.textSecondary};
    font-weight: normal;
    font-size: 18px;

    @media only screen and (max-width: 560px) {
      font-size: 16px;
    }
  `
);

export const ArticleHeroCard: FC<ArticleCardProps> = ({
  title,
  lede,
  url,
  coverImage,
  category
}) => {
  return (
    <article>
      <Link href="/article/[slug]" as={url} passHref>
        <StyledArticleLink>
          <Thumbnail
            alt={coverImage.alt}
            src={coverImage.sizes["800"].url}
            srcSet={coverImage.sizes}
            sizes="(max-width: 768px) 100vw, 66vw"
            dominantColor={coverImage.dominantColor}
            loading="eager"
            width={16}
            height={9}
          />
          <ArticleInformation>
            <Heading component="h3" variant="h5" gutterBottom>
              {category.name}
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

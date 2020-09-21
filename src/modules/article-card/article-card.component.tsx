import React, { FC } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Image } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<Article, "title" | "lede" | "url" | "images">;

const StyledArticleLink = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    grid-template-columns: 1fr 3fr;

    @media only screen and (max-width: 560px) {
      grid-column-gap: 20px;
    }
  }
`;

const Thumbnail = styled(Image)`
  width: 100%;
  height: auto;
  display: block;

  @media only screen and (max-width: 768px) {
    &:before {
      padding-top: 100%;
    }
  }
`;

const ArticleInformation = styled.div`
  padding-top: 30px;

  @media only screen and (max-width: 768px) {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Title = styled(Heading)`
  font-size: 24px;

  @media only screen and (max-width: 1400px) {
    font-size: 21px;
  }

  @media only screen and (max-width: 560px) {
    font-size: 18px;
  }
`;

const Lede = styled(Text)(
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
  images
}) => {
  const [coverImage] = images;

  return (
    <article>
      <Link href="/article/[slug]" as={url} passHref>
        <StyledArticleLink>
          <div>
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
          </div>
          <ArticleInformation>
            <Heading component="h3" variant="h5" gutterBottom>
              Silicon Valley
            </Heading>
            <Title component="h2" gutterBottom>
              {title}
            </Title>
            <Lede component="p" variant="h3">
              {lede}
            </Lede>
          </ArticleInformation>
        </StyledArticleLink>
      </Link>
    </article>
  );
};

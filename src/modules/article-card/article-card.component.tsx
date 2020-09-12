import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Image, StyledImage } from "../../catalog/image/image.component";
import { Heading } from "../../catalog/heading/heading.component";
import { Article } from "../../entities/article.entity";
import { Text } from "../../catalog/text/text.component";

type ArticleCardProps = Pick<
  Article,
  "title" | "description" | "url" | "thumbnail" | "coverImageAlt"
>;

const StyledArticleCard = styled.a`
  text-decoration: none;

  ${StyledImage} {
    width: 100%;
  }
`;

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
          <Heading component="h2" variant="h2" gutterBottom>
            {title}
          </Heading>
          <Text component="p" gutterBottom>
            {description}
          </Text>
          <Image alt={coverImageAlt} src={thumbnail} />
        </StyledArticleCard>
      </Link>
    </article>
  );
};

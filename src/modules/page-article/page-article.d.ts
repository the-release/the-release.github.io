export interface PageArticleProps {
  htmlContent: string;
  metadata: ArticleMetadata;
}

export interface ArticleMetadata {
  title: string;
  description: string;
  image: string;
  creationDate: string;
}

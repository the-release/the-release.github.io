export interface PageArticleProps {
  htmlContent: string;
  metadata: ArticleMetadata;
}

export interface ArticleMetadata {
  title: string;
  description: string;
  coverImageUrl: string;
  creationDate: string;
}

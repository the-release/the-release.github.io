export interface ArticleMetadata {
  title: string;
  description: string;
  coverImageUrl: string;
  creationDate: string;
}

export interface Article {
  slug: string;
  htmlContent: string;
  metadata: ArticleMetadata;
}

export interface Article {
  slug: string;
  htmlContent: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  thumbnail: string | null;
  creationDate: string;
}

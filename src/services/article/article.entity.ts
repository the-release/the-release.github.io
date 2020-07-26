import { Category } from "../category/category.entity";
import { Author } from "../author/author.entity";

export interface Article {
  url: string;
  slug: string;
  htmlContent: string;
  title: string;
  description: string;
  coverImageUrl: string;
  coverImageAlt: string;
  thumbnail: string;
  creationDate: string;
  timestamp: number;
  category: Category;
  author: Author;
  readingTime: string;
}

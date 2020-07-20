import { Category } from "../category/category.entity";
import { Author } from "../author/author.entity";

export interface Article {
  slug: string;
  htmlContent: string;
  title: string;
  description: string;
  coverImageUrl: string;
  thumbnail: string;
  creationDate: string;
  timestamp: number;
  category: Category;
  author: Author;
}

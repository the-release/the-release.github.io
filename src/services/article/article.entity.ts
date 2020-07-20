import { Category } from "../category/category.entity";

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
}

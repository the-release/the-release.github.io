import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./author.entity";
import { Category } from "./category.entity";
import { Image } from "./image.entity";

@Entity("article")
export class Article {
  @PrimaryColumn({ type: "text" })
  slug: string;

  @Column({ type: "text", unique: true })
  url: string;

  @Column({ type: "text", unique: true })
  absoluteUrl: string;

  @Column({ type: "text" })
  htmlContent: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  lede: string;

  @Column({ type: "simple-json" })
  coverImage: Image;

  @Column({ type: "text" })
  publishedAt: string;

  @Column({ type: "text" })
  keywords: string;

  @Column({ type: "int" })
  timestamp: number;

  @Column({ type: "int" })
  isDraft: number;

  @ManyToOne(
    () => Category,
    category => category.slug
  )
  category: Category;

  @ManyToOne(
    () => Author,
    author => author.slug
  )
  author: Author;

  @Column({ type: "text" })
  readingTime: string;

  constructor(props: Article = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.slug = props.slug;
    this.htmlContent = props.htmlContent;
    this.title = props.title;
    this.lede = props.lede;
    this.coverImage = props.coverImage;
    this.publishedAt = props.publishedAt;
    this.keywords = props.keywords;
    this.timestamp = props.timestamp;
    this.isDraft = props.isDraft;
    this.category = props.category;
    this.author = props.author;
    this.readingTime = props.readingTime;
  }
}

import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./author.entity";
import { Category } from "./category.entity";

@Entity("article")
export class Article {
  // TODO: put proper lengths
  @PrimaryColumn({ type: "varchar", length: 255 })
  slug: string;

  @Column({ type: "varchar", length: 255, unique: true })
  url: string;

  @Column({ type: "varchar", length: 255 })
  htmlContent: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 255 })
  coverImageUrl: string;

  @Column({ type: "varchar", length: 255 })
  coverImageAlt: string;

  @Column({ type: "varchar", length: 255 })
  thumbnail: string;

  @Column({ type: "varchar", length: 255 })
  creationDate: string;

  @Column({ type: "int" })
  timestamp: number;

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

  @Column({ type: "varchar", length: 255 })
  readingTime: string;

  constructor(props: Article = {} as any) {
    this.url = props.url;
    this.slug = props.slug;
    this.htmlContent = props.htmlContent;
    this.title = props.title;
    this.description = props.description;
    this.coverImageUrl = props.coverImageUrl;
    this.coverImageAlt = props.coverImageAlt;
    this.thumbnail = props.thumbnail;
    this.creationDate = props.creationDate;
    this.timestamp = props.timestamp;
    this.category = props.category;
    this.author = props.author;
    this.readingTime = props.readingTime;
  }
}

import { Entity, PrimaryColumn, Column } from "typeorm";
import { Image } from "./image.entity";

@Entity("author")
export class Author {
  @PrimaryColumn({ type: "text" })
  slug: string;

  @Column({ type: "text", unique: true })
  url: string;

  @Column({ type: "text", unique: true })
  absoluteUrl: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "simple-json" })
  image: Image;

  constructor(props: Author = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.name = props.name;
    this.slug = props.slug;
    this.image = props.image;
  }
}

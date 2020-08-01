import { Entity, PrimaryColumn, Column } from "typeorm";

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

  @Column({ type: "text" })
  thumbnail: string;

  constructor(props: Author = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.name = props.name;
    this.slug = props.slug;
    this.thumbnail = props.thumbnail;
  }
}

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("author")
export class Author {
  @PrimaryColumn({ type: "varchar", length: 255 })
  slug: string;

  @Column({ type: "varchar", length: 255, unique: true })
  url: string;

  @Column({ type: "varchar", length: 255, unique: true })
  absoluteUrl: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  thumbnail: string;

  constructor(props: Author = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.name = props.name;
    this.slug = props.slug;
    this.thumbnail = props.thumbnail;
  }
}

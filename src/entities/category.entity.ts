import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryColumn({ type: "text" })
  slug: string;

  @Column({ type: "text", unique: true })
  url: string;

  @Column({ type: "text", unique: true })
  absoluteUrl: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  keywords: string;

  constructor(props: Category = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.name = props.name;
    this.slug = props.slug;
    this.keywords = props.keywords;
  }
}

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("page")
export class Page {
  @PrimaryColumn({ type: "text" })
  slug: string;

  @Column({ type: "text", unique: true })
  url: string;

  @Column({ type: "text", unique: true })
  absoluteUrl: string;

  @Column({ type: "text" })
  htmlContent: string;

  constructor(props: Page = {} as any) {
    this.url = props.url;
    this.absoluteUrl = props.absoluteUrl;
    this.slug = props.slug;
    this.htmlContent = props.htmlContent;
  }
}

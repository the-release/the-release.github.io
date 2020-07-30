import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryColumn({ type: "varchar", length: 255 })
  slug: string;

  @Column({ type: "varchar", length: 255, unique: true })
  url: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  constructor(props: Category = {} as any) {
    this.url = props.url;
    this.name = props.name;
    this.slug = props.slug;
  }
}

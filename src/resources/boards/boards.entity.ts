import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnModel } from "./types";

/**
 * Entity Board for TypeORM.
 * If params undefined constructor use default params
 * @returns new Entity<Board>
 */
@Entity({ name: "Boards" })
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @Column("simple-json")
  columns: ColumnModel[];
}

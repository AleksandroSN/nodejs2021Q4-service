import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/tasks.entity";
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

  @OneToMany(() => Task, (task) => task.boardId)
  task: Task | undefined;
}

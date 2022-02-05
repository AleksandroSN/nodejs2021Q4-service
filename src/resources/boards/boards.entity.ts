import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ApiProperty({
    example: "Board1",
    description: "Something title for Board",
  })
  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @ApiProperty({
    example: JSON.stringify([
      { title: "Backlog", order: 1 },
      { title: "Sprint", order: 2 },
    ]),
    description: "Columns for Board",
  })
  @Column("simple-json")
  columns: ColumnModel[];

  @OneToMany(() => Task, (task) => task.boardId)
  task: Task | undefined;
}

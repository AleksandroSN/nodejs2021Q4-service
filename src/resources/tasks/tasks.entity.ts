import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../boards/boards.entity";
import { User } from "../users/users.entity";

/**
 * Entity Task for TypeORM.
 * @returns new instance Task
 */

@Entity({ name: "Tasks" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  id: string;

  @Column({ type: "varchar", length: 255 })
  @ApiProperty({
    example: "Task1",
    description: "Something name of task",
  })
  title: string;

  @Column({ type: "integer" })
  @ApiProperty({
    example: "0",
    description: "Order task. Type integer",
  })
  order: number;

  @Column({ type: "varchar", length: 255 })
  @ApiProperty({
    example: "Create BEST API",
    description: "Something description",
  })
  description: string;

  @Column({ type: "varchar", nullable: true })
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  userId: string | null;

  @Column({ type: "varchar", nullable: true })
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  columnId: string | null;

  @Column({ type: "varchar", nullable: true })
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  boardId: string | null;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" })
  user: User | undefined;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: "CASCADE" })
  board: Board | undefined;
}

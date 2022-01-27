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
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "integer" })
  order: number;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", nullable: true })
  userId: string | null;

  @Column({ type: "varchar", nullable: true })
  columnId: string | null;

  @Column({ type: "varchar", nullable: true })
  boardId: string | null;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" })
  user: User | undefined;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: "CASCADE" })
  board: Board | undefined;
}

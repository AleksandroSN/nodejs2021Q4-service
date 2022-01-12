import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";
import { Board } from "../boards/board.model";
import { User } from "../users/user.model";

/**
 * create new Task with params.
 * If params undefined constructor use default params
 * @returns new instance Task
 */

@Entity({ name: "Tasks" })
export class Task implements dataModels.TaskModel {
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

  /**
   * constructor recieve object and destructure him
   * for add default value
   * object have next keys :
   * @param id - unique id in uuid format. Type string.
   * @param title - task title. Type string.
   * @defaultValue param title "TestTask"
   * @param order - task order, type integer
   * @defaultValue param order `0`
   * @param description - task description
   * @defaultValue param description `Default dummy task`
   * @param userId - userId who created task
   * @defaultValue param userId ""
   * @param boardId - boardId where the column is placed
   * @defaultValue param boardId ""
   * @param columnId - columnId where create task
   * @defaultValue param columnId ""
   */

  constructor(
    {
      id = uuid(),
      title = "TestTask",
      order = 0,
      description = "Default dummy task",
      userId = null,
      boardId = null,
      columnId = null,
    } = {} as dataModels.TaskModel
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId as string;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

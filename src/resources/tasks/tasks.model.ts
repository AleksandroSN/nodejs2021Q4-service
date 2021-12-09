import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * create new Task with params.
 * If params undefined constructor use default params
 * @returns new instance Task
 */
export class Task implements dataModels.TaskModel {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;

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

  constructor({
    id = uuid(),
    title = "TestTask",
    order = 0,
    description = "Default dummy task",
    userId = "",
    boardId = "",
    columnId = "",
  }: dataModels.TaskModel) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId as string;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

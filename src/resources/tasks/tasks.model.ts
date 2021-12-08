import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * class for create new task
 * @param id - unique id
 * @param title - task title
 * @param order - task order, type integer
 * @param description - task description
 * @param userId - userId who created task
 * @param boardId - boardId where the column is placed
 * @param columnId - columnId where create task
 * @returns new istance of Task
 */
export class Task implements dataModels.TaskModel {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;

  constructor({
    id = uuid(),
    title = "",
    order = 0,
    description = "",
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

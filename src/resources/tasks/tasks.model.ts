import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

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
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

export class Board implements dataModels.BoardModel {
  id: string;

  title: string;

  columns: string[];

  constructor({ id = uuid(), title = "Board", columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * create Board with params.
 * If params undefined constructor use default params
 * @param id - unique id
 * @param title - board title
 * @param columns - board columns with view Array(title: string, order: number)
 * @returns new instance Board
 */
export class Board implements dataModels.BoardModel {
  id: string;

  title: string;

  columns: dataModels.ColumnModel[];

  constructor({
    id = uuid(),
    title = "Board",
    columns = [],
  }: dataModels.BoardModel) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

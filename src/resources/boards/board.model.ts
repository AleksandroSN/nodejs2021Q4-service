import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import type { dataModels } from "../../types";

/**
 * create Board with params.
 * If params undefined constructor use default params
 * @returns new instance Board
 */

@Entity({ name: "Boards" })
export class Board implements dataModels.BoardModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("simple-json")
  columns: dataModels.ColumnModel[];

  /**
   * constructor recieve object and destructure him
   * for add default value
   * object have next keys :
   * @param id - unique id in uuid format. Type string.
   * @param title - board title. Type string.
   * @defaultValue param title "Board"
   * @param columns - board columns. Type {@link dataModels.BoardModel}
   * @defaultValue param columns `[]`
   */

  constructor(
    { id = uuid(), title = "Board", columns = [] } = {} as dataModels.BoardModel
  ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

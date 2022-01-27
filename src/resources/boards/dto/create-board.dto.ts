import { IsString } from "class-validator";
import { ColumnModel } from "../types";

export class CreateBoardDTO {
  @IsString()
  title: string;

  columns: ColumnModel[];
}

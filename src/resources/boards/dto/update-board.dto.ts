import { IsString } from "class-validator";
import { ColumnModel } from "../types";

export class UpdateBoardDTO {
  @IsString()
  title: string;

  columns: ColumnModel[];
}

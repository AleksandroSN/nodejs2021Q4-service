import { IsArray, IsOptional, IsString } from "class-validator";
import { ColumnModel } from "../types";

export class CreateBoardDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  title: string;

  @IsArray()
  columns: ColumnModel[];
}

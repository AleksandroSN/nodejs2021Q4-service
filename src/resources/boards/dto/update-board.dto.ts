import { IsArray, IsOptional, IsString } from "class-validator";
import { ColumnModel } from "../types";

export class UpdateBoardDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  columns?: ColumnModel[];
}

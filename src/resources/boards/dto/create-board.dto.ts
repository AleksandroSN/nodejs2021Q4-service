import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ColumnModel } from "../types";

export class CreateBoardDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsArray()
  columns: ColumnModel[];
}

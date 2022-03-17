import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ColumnModel } from "../types";

export class UpdateBoardDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  title?: string;

  @IsArray()
  @IsOptional()
  columns?: ColumnModel[];
}

import {
  IsString,
  IsOptional,
  IsInt,
  IsNotEmpty,
  MinLength,
} from "class-validator";

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  title?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string | null;

  @IsString()
  @IsOptional()
  boardId?: string | null;

  @IsString()
  @IsOptional()
  columnId?: string | null;
}

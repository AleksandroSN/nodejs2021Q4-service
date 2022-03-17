import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsInt()
  order: number;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @IsOptional()
  userId: string | null;

  @IsString()
  @IsOptional()
  boardId: string | null;

  @IsString()
  @IsOptional()
  columnId: string | null;
}

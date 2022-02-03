import { IsString, IsOptional, IsInt } from "class-validator";

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
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

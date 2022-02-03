import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
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

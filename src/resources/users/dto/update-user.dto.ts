import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  password?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  login?: string;
}

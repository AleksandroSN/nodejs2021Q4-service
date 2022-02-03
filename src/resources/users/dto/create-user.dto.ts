import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  login: string;
}

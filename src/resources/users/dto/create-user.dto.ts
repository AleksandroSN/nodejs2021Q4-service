import { IsOptional, IsString } from "class-validator";
export class CreateUserDTO {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  login: string;
}

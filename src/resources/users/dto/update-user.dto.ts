import { IsOptional, IsString } from "class-validator";
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  login?: string;
}

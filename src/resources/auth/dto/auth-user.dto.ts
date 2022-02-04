import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthUserDTO {
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  login: string;

  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  password: string;
}

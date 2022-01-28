import { IsString } from "class-validator";

export class AuthUserDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

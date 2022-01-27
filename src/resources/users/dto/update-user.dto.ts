import { IsString } from "class-validator";
export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  login: string;
}

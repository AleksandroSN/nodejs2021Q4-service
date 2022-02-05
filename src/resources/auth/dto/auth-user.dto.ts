import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthUserDTO {
  @ApiProperty({
    example: "H@ckEr",
    description: "Something login",
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  login: string;

  @ApiProperty({
    example: "P@sSw0RD",
    description: "Something password",
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  password: string;
}

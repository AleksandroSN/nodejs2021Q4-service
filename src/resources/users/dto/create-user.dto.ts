import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDTO {
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format, optional.",
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @ApiProperty({
    example: "Derow",
    description: "Something name, optional",
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiProperty({
    example: "P@ssW0Rd",
    description: "Something password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  password: string;

  @ApiProperty({
    example: "Derow777",
    description: "Something login",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  login: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class ResponseUserDTO {
  @ApiProperty({
    example: "e6b552cf-64ae-4d6e-a28e-bdfd8446ea58",
    description: "string in UUID format",
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @ApiProperty({
    example: "Derow",
    description: "Something name",
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiProperty({
    example: "Derow777",
    description: "Something login",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  login: string;
}

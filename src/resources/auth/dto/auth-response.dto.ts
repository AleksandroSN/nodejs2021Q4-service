import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDTO {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJpbnRlcmVzbm8gZGEgPyIsImtleV9pZCI6Im9weWF0IHRpIHN1ZGEgc21vdHJpc2ggPyIsImlhdCI6MTUxNjIzOTAyMn0._cJmAKRD5fEmSR9g3FMmYFBD2GSVATf-ZagO4MT3mG4",
    description: "API give token, if user authenticate",
  })
  token: string;
}

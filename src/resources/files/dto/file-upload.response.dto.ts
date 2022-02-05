import { ApiProperty } from "@nestjs/swagger";

interface FileBodyResponse {
  size: number;
  path: string;
  name: string;
  type: string;
  mtime: string;
}

export class FileUploadResponseDTO {
  @ApiProperty({
    example: {
      size: 24223,
      path: "%path%/upload/upload_16736ef3bf1a8d4063c9310b0b0eded0.png",
      name: "4b81aa36aab8b786919bcbca97aa91b1-3.png",
      type: "image/png",
      mtime: "2022-02-05T17:54:08.300Z",
    },
    description: "Response from API after file is upload",
  })
  file: FileBodyResponse;
}

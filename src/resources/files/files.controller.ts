import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
} from "@nestjs/common";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FileUploadResponseDTO } from "./dto/file-upload.response.dto";
import { FilesUploadDto } from "./dto/files-upload.dto";
import { FilesService } from "./files.service";

@Controller("files")
@ApiTags("Files")
export class FilesController {
  constructor(private readonly filesSerivice: FilesService) {}

  @Post()
  @ApiOperation({ summary: "Upload to API one or many files" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "List of files. RESTRICTION: 5MB",
    type: FilesUploadDto,
  })
  @ApiResponse({ status: 201, type: [FileUploadResponseDTO] })
  async uploadFile(@Req() req, @Res() res) {
    return await this.filesSerivice.uploadFile(req, res);
  }

  @Get(":filename")
  @ApiOperation({ summary: "Get a file from stream" })
  @ApiResponse({ status: 200 })
  getFile(@Param("filename") filename: string): StreamableFile {
    return this.filesSerivice.getFile(filename);
  }
}

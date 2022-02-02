import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private readonly filesSerivice: FilesService) {}

  @Post()
  async uploadSingle(@Req() req, @Res() res) {
    return await this.filesSerivice.uploadFile(req, res);
  }

  @Get(":filename")
  getFile(@Param("filename") filename: string): StreamableFile {
    return this.filesSerivice.getFile(filename);
  }
}

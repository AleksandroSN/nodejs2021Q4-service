import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as formidable from "formidable";
import { AppConfig } from "src/configs/config.inteface";
import { PATH_TO_FILES } from "src/utils";

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}
  getFile(filename: string) {
    return `Here is your file ${filename}`;
  }

  uploadFileExpres(req, res) {
    const file = formidable({
      uploadDir: PATH_TO_FILES,
      maxFileSize: 5e6,
      filename: () => "1",
    });
    console.log(file);
    file.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
        res.end(String(err));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });
  }

  async uploadFileFastify(req, res) {
    await req.parseMultipart();
    const files = req.files;

    res.end(JSON.stringify({ files }, null, 2));
  }

  async uploadFile(req, res) {
    const { USE_FASTIFY } = this.configService.get<AppConfig>("appConfig");

    if (USE_FASTIFY === "true") {
      return await this.uploadFileFastify(req, res);
    }
    return this.uploadFileExpres(req, res);
  }
}

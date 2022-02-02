import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createReadStream, existsSync, mkdirSync } from "fs";
import * as formidable from "formidable";
import * as path from "path";
import { AppConfig } from "src/configs/config.inteface";
import { formidableConfig, PATH_TO_FILES } from "src/utils";

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}
  getFile(filename: string) {
    const file = createReadStream(path.join(PATH_TO_FILES, `/${filename}`));
    return new StreamableFile(file);
  }

  uploadFileExpres(req, res) {
    const file = formidable({
      ...formidableConfig,
      filename: (name: string, ext: string) => {
        return `upload_${name}${ext}`;
      },
    });
    if (!existsSync(PATH_TO_FILES)) {
      mkdirSync(PATH_TO_FILES, { recursive: true });
    }
    file.parse(req, (err, _, files) => {
      if (err) {
        throw new HttpException(
          `Something wrong with upload ${err}`,
          HttpStatus.BAD_REQUEST
        );
      }
      res.send(files);
    });
  }

  async uploadFileFastify(req, res) {
    await req.parseMultipart();
    const files = req.files;
    res.send(files);
  }

  async uploadFile(req, res) {
    const { USE_FASTIFY } = this.configService.get<AppConfig>("appConfig");

    if (USE_FASTIFY === "true") {
      return await this.uploadFileFastify(req, res);
    }
    return this.uploadFileExpres(req, res);
  }
}

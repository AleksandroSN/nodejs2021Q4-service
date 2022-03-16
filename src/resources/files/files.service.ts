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
import { AppConfig, formidableConfig } from "../../configs";
import { PATH_TO_FILES } from "../../utils";
import { IncomingMessage } from "http";
import { Response } from "express";

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}
  getFile(filename: string) {
    const file = createReadStream(path.join(PATH_TO_FILES, `/${filename}`));
    return new StreamableFile(file);
  }

  async uploadFileExpres(req: IncomingMessage, res: Response) {
    const file = formidable({
      ...formidableConfig,
      filename: (name: string, ext: string) => {
        return `upload_${name}${ext}`;
      },
    });
    if (!existsSync(PATH_TO_FILES)) {
      mkdirSync(PATH_TO_FILES, { recursive: true });
    }
    return new Promise((resolve, reject) => {
      file.parse(req, (err, _, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    })
      .then((files) => {
        res.send(files);
        return;
      })
      .catch((err) => {
        throw new HttpException(
          `Something wrong with upload ${err}`,
          HttpStatus.BAD_REQUEST
        );
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
      return this.uploadFileFastify(req, res);
    }
    return this.uploadFileExpres(req, res);
  }
}

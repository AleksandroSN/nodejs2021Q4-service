import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Params } from "nestjs-pino";
import { AppConfig } from "../configs";
import { LOG_LEVELS, PATH_TO_ERROR_LOG_FILE, PATH_TO_LOG_FILE } from "../utils";

@Injectable()
export class ConfigLoggerService {
  constructor(private configService: ConfigService) {}

  getConfig(): Params {
    const { LOG_LEVEL } = this.configService.get<AppConfig>("appConfig");
    return {
      pinoHttp: {
        level: LOG_LEVELS[LOG_LEVEL],
        serializers: {
          req(request) {
            return {
              method: request.method,
              url: request.url,
            };
          },
        },
        transport: {
          targets: [
            {
              level: LOG_LEVELS[LOG_LEVEL],
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "yyyy-dd-mm, h:MM:ss TT",
              },
            },
            {
              level: LOG_LEVELS[LOG_LEVEL],
              target: "pino-pretty",
              options: {
                destination: PATH_TO_LOG_FILE,
                mkdir: true,
                translateTime: "yyyy-dd-mm, h:MM:ss TT",
              },
            },
            {
              level: "error",
              target: "pino-pretty",
              options: {
                destination: PATH_TO_ERROR_LOG_FILE,
                mkdir: true,
                translateTime: "yyyy-dd-mm, h:MM:ss TT",
              },
            },
          ],
        },
      },
    };
  }
}

import { Params } from "nestjs-pino";
import {
  LOG_LEVELS,
  PATH_TO_ERROR_LOG_FILE,
  PATH_TO_LOG_FILE,
} from "src/utils";

export const pinoConfig = async (logLevel: string): Promise<Params> => {
  return {
    pinoHttp: {
      level: LOG_LEVELS[logLevel],
      transport: {
        targets: [
          {
            level: LOG_LEVELS[logLevel],
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "yyyy-dd-mm, h:MM:ss TT",
            },
          },
          {
            level: LOG_LEVELS[logLevel],
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
};

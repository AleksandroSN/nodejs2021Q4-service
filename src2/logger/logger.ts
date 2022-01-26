import fs from "fs";
import type {
  FastifyInstance,
  FastifyLoggerOptions,
  FastifyRequest,
} from "fastify";
import { errorLogFile, invalidsPort } from "../utils";

export const getPinoConfig = (
  logLevel: string,
  pathToLog: string,
  pathToErrorLog: string
): FastifyLoggerOptions => {
  return {
    level: logLevel,
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
    serializers: {
      req(request: FastifyRequest) {
        return {
          hostname: request.hostname,
          method: request.method,
          remoteAddress: request.ip,
          url: request.url,
          queryParams: request.query,
        };
      },
    },
    file: logLevel === "error" ? pathToErrorLog : pathToLog,
  };
};

export const bodyParser = async (req: FastifyRequest): Promise<void> => {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
};

export const portValidation = (port: string, app: FastifyInstance) => {
  if (invalidsPort[port]) {
    process.stdout.write(`WARN, Do not use this port! ${port} \n`);
    app.log.warn(`Do not use this port! ${port}`);
  }
};

export const debugInfo = (app: FastifyInstance) => {
  app.log.debug("Debug msg");
};

process.on("uncaughtException", (err) => {
  process.stdout.write("Error, saved in file errorLog.log \n");
  process.stdout.write(`${err} \n`);
  fs.writeFileSync(errorLogFile, err.message, {
    flag: "a",
  });
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  process.stdout.write("Error, saved in file errorLog.log \n");
  process.stdout.write(`${err} \n`);
  fs.writeFileSync(errorLogFile, err.message, {
    flag: "a",
  });
  process.exit(1);
});

import fs from "fs";
import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { errorLogFile, logFile } from "../utils";

export const getPinoConfig = (
  logLevel: string,
  pathToLog: string,
  pathToErrorLog: string
) => {
  return {
    logger: {
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
    },
  };
};

export const bodyParser = (
  req: FastifyRequest,
  _: FastifyReply,
  done: HookHandlerDoneFunction
): void => {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
  done();
};

process.on("uncaughtException", (err) => {
  process.stdout.write("Error, saved in file errorLog.txt \n");
  fs.writeFileSync(errorLogFile, err.message, {
    flag: "a",
  });
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  process.stdout.write("Error, saved in file errorLog.txt \n");
  fs.writeFileSync(logFile, err.message, {
    flag: "a",
  });
  process.exit(1);
});

import path from "path";
import fs from "fs";
import fastify, { FastifyInstance } from "fastify";
import swagger from "fastify-swagger";
import { PORT as PORT_ENV, LOG_LEVEL } from "./common";
import { logLevels, validateId } from "./utils";
import { usersRoute } from "./resources/users";
import { boardsRouter } from "./resources/boards";
import { tasksRouter } from "./resources/tasks";
import type { RequestParams } from "./types/requestTypes";

export const PORT: string | number = PORT_ENV || 9999;
const level = logLevels[LOG_LEVEL] || "silent";

export const app: FastifyInstance = fastify({
  logger: {
    level,
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
    serializers: {
      req(request) {
        return {
          hostname: request.hostname,
          method: request.method,
          remoteAddress: request.ip,
          url: request.url,
          queryParams: request.query,
        };
      },
    },
    file:
      level === "error"
        ? path.join(__dirname, "../errorLog.txt")
        : path.join(__dirname, "../log.txt"),
  },
});

app.addHook<{ Params: RequestParams }>("onRequest", (req, res, done) => {
  const { params } = req;
  const wrongPath = params["*"];
  const paramValues = Object.values(params);
  if (wrongPath === undefined && paramValues.length > 0) {
    validateId(res, paramValues);
  }
  done();
});

app.addHook("preHandler", (req, _, done) => {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
  done();
});

process.on("uncaughtException", (err) => {
  console.log("Error, saved in file errorLog.txt");
  fs.writeFileSync(path.join(__dirname, "../errorLog.txt"), err.message, {
    flag: "a",
  });
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("Error, saved in file errorLog.txt");
  fs.writeFileSync(path.join(__dirname, "../errorLog.txt"), err.message, {
    flag: "a",
  });
  process.exit(1);
});

app.register(swagger, {
  exposeRoute: true,
  routePrefix: "/docs",
  openapi: {
    info: {
      title: "Trello Service",
      description: "Let's try to create a competitor for Trello!",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
});

app.register(usersRoute);
app.register(boardsRouter);
app.register(tasksRouter);

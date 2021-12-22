import fastify, { FastifyInstance } from "fastify";
import swagger from "fastify-swagger";
import { PORT as PORT_ENV, LOG_LEVEL } from "./common";
import { errorLogFile, logFile, logLevels, validateId } from "./utils";
import { usersRoute } from "./resources/users";
import { boardsRouter } from "./resources/boards";
import { tasksRouter } from "./resources/tasks";
import { logger } from "./logger";
import type { RequestParams } from "./types/requestTypes";

const level = logLevels[LOG_LEVEL] || "silent";
export const PORT: string | number = PORT_ENV || 9999;

export const app: FastifyInstance = fastify(
  logger.getPinoConfig(level, logFile, errorLogFile)
);

app.addHook<{ Params: RequestParams }>("onRequest", (req, res, done) => {
  const { params } = req;
  const wrongPath = params["*"];
  const paramValues = Object.values(params);
  if (wrongPath === undefined && paramValues.length > 0) {
    validateId(res, paramValues);
  }
  done();
});

app.addHook("preHandler", logger.bodyParser);

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

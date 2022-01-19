import fastify, { FastifyInstance } from "fastify";
import fastifyJWT from "fastify-jwt";
import swagger from "fastify-swagger";
import { checkPath, validateId } from "./utils";
import { usersRoute } from "./resources/users";
import { boardsRouter } from "./resources/boards";
import { tasksRouter } from "./resources/tasks";
import { authRouter } from "./resources/auth";
import { logger } from "./logger";
import { serverOptions, PORT } from "./serverOptions";
import { JWT_SECRET_KEY } from "./common";
import type { RequestParams } from "./types/requestTypes";

export const app: FastifyInstance = fastify(serverOptions);

app.addHook<{ Params: RequestParams }>("onRequest", async (req, res) => {
  const { params, url } = req;
  const wrongPath = params["*"];
  const paramValues = Object.values(params);
  try {
    await checkPath(req, url);
    if (wrongPath === undefined && paramValues.length > 0) {
      validateId(res, paramValues);
    }
  } catch (error) {
    res.send(error);
  }
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

app.register(fastifyJWT, { secret: JWT_SECRET_KEY });

app.register(usersRoute);
app.register(boardsRouter);
app.register(tasksRouter);
app.register(authRouter);

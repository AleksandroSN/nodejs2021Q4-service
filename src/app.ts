import fastify from "fastify";
import swagger from "fastify-swagger";
import { PORT as PORT_ENV } from "./common";
import { validateId } from "./utils";
import { usersRoute } from "./resources/users";
import type { RequestParams } from "./types/requestTypes";

// const { boardsRouter } = require("./resources/boards");
// const { tasksRouter } = require("./resources/tasks");

export const PORT = PORT_ENV || 9999;

export const app = fastify();

app.addHook<{ Params: RequestParams }>("onRequest", (req, res, done) => {
  const { params } = req;
  const wrongPath = params["*"];
  const paramValues = Object.values(params);
  if (wrongPath === undefined && paramValues.length > 0) {
    validateId(res, paramValues);
  }
  done();
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
// app.register(boardsRouter);
// app.register(tasksRouter);

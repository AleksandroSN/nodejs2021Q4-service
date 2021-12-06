import fastify from "fastify";
import swagger from "fastify-swagger";
import { PORT_ENV } from "./common";
import { validateId } from "./utils";

const { usersRouter } = require("./resources/users");
const { boardsRouter } = require("./resources/boards");
const { tasksRouter } = require("./resources/tasks");

const PORT = PORT_ENV || 9999;

const app = fastify();

interface RequestParams {
  [key: string]: string;
}

app.addHook<{ Params: RequestParams }>("onRequest", (req, res, done) => {
  const { params } = req;
  const wrongPath = req.params["*"];
  const paramValues = Object.values(req.params);
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

app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);

module.exports = {
  app,
  PORT,
};

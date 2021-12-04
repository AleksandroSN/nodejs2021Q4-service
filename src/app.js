const app = require("fastify")({ logger: true });
const swagger = require("fastify-swagger");

const { usersRouter } = require("./resources/users");
const { boardsRouter } = require("./resources/boards");
const { tasksRouter } = require("./resources/tasks");
const { PORT_ENV } = require("./common");
const { validateId } = require("./utils");

const PORT = PORT_ENV || 9999;

app.addHook("onRequest", (req, res, done) => {
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

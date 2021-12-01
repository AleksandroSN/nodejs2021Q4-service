const app = require("fastify")({ logger: true });
const swagger = require("fastify-swagger");

const { usersRouter } = require("./resources/users");
const { boardsRouter } = require("./resources/boards");
const { tasksRouter } = require("./resources/tasks");
const { PORT_ENV } = require("./common");

const PORT = PORT_ENV || 9999;

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

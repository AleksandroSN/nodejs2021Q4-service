const app = require("fastify")({ logger: true });
const { usersRouter } = require("./resources/users");
const { boardsRouter } = require("./resources/boards");
const { tasksRouter } = require("./resources/tasks");
const { PORT_ENV } = require("./common");

const PORT = PORT_ENV || 9999;

app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);

module.exports = {
  app,
  PORT,
};

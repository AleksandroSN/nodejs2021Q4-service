const router = require("express").Router();
const User = require("./tasks.model");
const usersService = require("./tasks.service");

router.route("/").get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

const tasksRoute = (app, options, done) => {
  app.get("/boards/:boardId/tasks", (_, res) => {
    res.send("BOARDS");
  });

  app.get("/boards/:boardId/tasks/:taskId", (req, res) => {
    const { boardId, taskId } = req.params;
    res.send({ boardId, taskId });
  });

  app.post("/boards/:boardId/tasks", (req, res) => {
    res.send("POST BOARDS");
  });

  app.put("/boards/:boardId/tasks/:taskId", (req, res) => {
    const { boardId } = req.params;
    res.send(`PUT BOARDS ${boardId}`);
  });

  app.delete("/boards/:boardId/tasks/:taskId", (req, res) => {
    const { boardId } = req.params;
    res.send(`DELETE BOARDS ${boardId}`);
  });

  done();
};

module.exports = tasksRoute;

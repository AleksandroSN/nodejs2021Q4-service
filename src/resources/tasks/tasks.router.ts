const {
  getAllTasksOpts,
  getTaskOpts,
  putOpts,
  postOpts,
  deleteOpts,
} = require("./tasks.options");

const tasksRoute = (app, options, done) => {
  app.get("/boards/:boardId/tasks", getAllTasksOpts);

  app.get("/boards/:boardId/tasks/:taskId", getTaskOpts);

  app.post("/boards/:boardId/tasks", postOpts);

  app.put("/boards/:boardId/tasks/:taskId", putOpts);

  app.delete("/boards/:boardId/tasks/:taskId", deleteOpts);

  done();
};

module.exports = tasksRoute;

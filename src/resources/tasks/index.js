const tasksRouter = require("./tasks.router");
const { deleteAllTasks, resetUser } = require("./tasks.service");

module.exports = {
  tasksRouter,
  deleteAllTasks,
  resetUser,
};

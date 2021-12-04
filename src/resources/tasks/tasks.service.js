const { HTTP_STATUS, findId } = require("../../utils");
const Task = require("./tasks.model");
let tasksRepo = require("./tasks.memory.repository");

const getAllTasks = (req, res) => {
  res.code(HTTP_STATUS.OK).send(tasksRepo);
};

const getTask = (req, res) => {
  const { taskId } = req.params;

  findId(tasksRepo, res, taskId);

  const result = tasksRepo.find((task) => task.id === taskId);

  res.code(HTTP_STATUS.OK).send(result);
};

const addTask = (req, res) => {
  const { boardId } = req.params;
  const { body } = req;
  const task = new Task(body);
  const result = { ...task, ...{ boardId } };
  tasksRepo.push(result);

  res.code(HTTP_STATUS.CREATED).send(result);
};

const updateTask = (req, res) => {
  const { taskId } = req.params;

  findId(tasksRepo, res, taskId);

  const { body } = req;
  const taskIdx = tasksRepo.findIndex((task) => task.id === taskId);
  const updatedUser = { ...tasksRepo[taskIdx], ...body };
  tasksRepo.splice(taskIdx, 1, updatedUser);

  res.code(HTTP_STATUS.OK).send(updatedUser);
};

const deleteTask = (req, res) => {
  const { taskId } = req.params;

  findId(tasksRepo, res, taskId);

  const taskIdx = tasksRepo.findIndex((task) => task.id === taskId);
  tasksRepo.splice(taskIdx, 1);

  res.code(HTTP_STATUS.NO_CONTENT).send();
};

const deleteAllTasks = (req) => {
  const { boardId } = req.params;

  tasksRepo = tasksRepo.filter((task) => task.boardId !== boardId);
};

const resetUser = (userId) => {
  tasksRepo = tasksRepo.map((task) =>
    task.userId === userId ? { ...task, ...{ userId: null } } : task
  );
};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  resetUser,
};

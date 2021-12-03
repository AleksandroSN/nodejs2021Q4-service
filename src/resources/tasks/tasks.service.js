const { HTTP_STATUS, validateId, findId } = require("../../utils");
const tasksRepo = require("./tasks.memory.repository");
const Task = require("./tasks.model");

const getAllTasks = (req, res) => {
  const { boardId } = req.params;

  validateId(res, boardId);
  // findId(tasksRepo, res, boardId);

  res.code(HTTP_STATUS.OK).send(tasksRepo);
};

const getTask = (req, res) => {
  const { taskId } = req.params;

  // validateId(res, boardId);
  validateId(res, taskId); // refactor to validate arr id's
  // findId(tasksRepo, res, boardId);
  findId(tasksRepo, res, taskId); // refactor to validate arr id's

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

  validateId(res, taskId);
  findId(tasksRepo, res, taskId);

  const { body } = req;
  const taskIdx = tasksRepo.findIndex((task) => task.id === taskId);
  const updatedUser = { ...tasksRepo[taskIdx], ...body };
  tasksRepo.splice(taskIdx, 1, updatedUser);

  res.code(HTTP_STATUS.OK).send(updatedUser);
};

const deleteTask = (req, res) => {
  const { taskId } = req.params;

  validateId(res, taskId);
  findId(tasksRepo, res, taskId);

  const taskIdx = tasksRepo.findIndex((task) => task.id === taskId);
  tasksRepo.splice(taskIdx, 1);

  res.code(HTTP_STATUS.NO_CONTENT).send();
};

module.exports = { getAllTasks, getTask, addTask, updateTask, deleteTask };

const { HTTP_STATUS, validateId, findId } = require("../../utils");
const usersRepo = require("./user.memory.repository");
const User = require("./user.model");

const getAllUsers = (_, res) => {
  res.code(HTTP_STATUS.OK).send(usersRepo);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  validateId(res, userId);
  findId(usersRepo, res, userId);

  const result = usersRepo.find((user) => user.id === userId);

  res.code(HTTP_STATUS.OK).send(result);
};

const addUser = (req, res) => {
  const { body } = req;
  const user = new User(body);
  usersRepo.push(user);

  res.code(HTTP_STATUS.CREATED).send(user);
};

const updateUser = (req, res) => {
  const { userId } = req.params;

  validateId(res, userId);
  findId(usersRepo, res, userId);

  const { body } = req;
  const userIdx = usersRepo.findIndex((user) => user.id === userId);
  const updatedUser = { ...usersRepo[userIdx], ...body };
  usersRepo.splice(userIdx, 1, updatedUser);

  res.code(HTTP_STATUS.OK).send(updatedUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  validateId(res, userId);
  findId(usersRepo, res, userId);

  const userIdx = usersRepo.findIndex((user) => user.id === userId);
  usersRepo.splice(userIdx, 1);

  res.code(HTTP_STATUS.NO_CONTENT).send();
};

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };

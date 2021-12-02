const { HTTP_STATUS, validateId, findId } = require("../../utils");
const boardRepo = require("./board.memory.repository");
const Board = require("./board.model");

const getAllBoards = (_, res) => {
  res.code(HTTP_STATUS.OK).send(boardRepo);
};

const getBoard = (req, res) => {
  const { boardId } = req.params;

  validateId(res, boardId);
  findId(boardRepo, res, boardId);

  const result = boardRepo.find((board) => board.id === boardId);

  res.code(HTTP_STATUS.OK).send(result);
};

const addBoard = (req, res) => {
  const { body } = req;
  const board = new Board(body);
  boardRepo.push(board);

  res.code(HTTP_STATUS.CREATED).send(board);
};

const updateBoard = (req, res) => {
  const { boardId } = req.params;

  validateId(res, boardId);
  findId(boardRepo, res, boardId);

  const { body } = req;
  const boardIdx = boardRepo.findIndex((board) => board.id === boardId);
  const updatedBoard = { ...boardRepo[boardIdx], ...body };
  boardRepo.splice(boardIdx, 1, updatedBoard);

  res.code(HTTP_STATUS.OK).send(updatedBoard);
};

const deleteBoard = (req, res) => {
  const { boardId } = req.params;
  validateId(res, boardId);
  findId(boardRepo, res, boardId);

  const boardIdx = boardRepo.findIndex((board) => board.id === boardId);
  boardRepo.splice(boardIdx, 1);

  res.code(HTTP_STATUS.NO_CONTENT).send();
};

module.exports = { getAllBoards, getBoard, addBoard, updateBoard, deleteBoard };

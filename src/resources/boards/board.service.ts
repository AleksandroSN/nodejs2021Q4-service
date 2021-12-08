import type { FastifyRequest, FastifyReply } from "fastify";
import type { dataModels, RequestParams } from "../../types";
import { HttpStatus, findId } from "../../utils";
import { boardRepo } from "./board.memory.repository";
import { deleteAllTasks } from "../tasks";

/**
 * async response from db with all boards
 * @param _ - request object , unuse
 * @param res - Fastify response object
 * @returns return all boards in db with 200 code
 */

export const getAllBoards = async (_: FastifyRequest, res: FastifyReply) => {
  const reply = await boardRepo.getAllBoards();

  await res.code(HttpStatus.OK).send(reply);
};

/**
 * async response from db with board on id
 * @param req - request object , unuse
 * @param res - Fastify response object
 * @returns return board on id with 200 code
 */

export const getBoard = async (req: FastifyRequest, res: FastifyReply) => {
  const { boardId } = req.params as RequestParams;
  findId(boardRepo.boards, res, boardId);
  const result = await boardRepo.findBoard(boardId);

  await res.code(HttpStatus.OK).send(result);
};

/**
 * async response from db with new board
 * @param req - request object , unuse
 * @param res - Fastify response object
 * @returns return new board with 201 code
 */

export const addBoard = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as dataModels.BoardModel;
  const newBoard = await boardRepo.addBoard(body);

  await res.code(HttpStatus.CREATED).send(newBoard);
};

/**
 * async response from db with updated board
 * @param req - request object , unuse
 * @param res - Fastify response object
 * @returns return updated board with 200 code
 */

export const updateBoard = async (req: FastifyRequest, res: FastifyReply) => {
  const { boardId } = req.params as RequestParams;
  const body = req.body as dataModels.BoardModel;
  findId(boardRepo.boards, res, boardId);
  const updatedBoard = await boardRepo.updateBoard(boardId, body);

  await res.code(HttpStatus.OK).send(updatedBoard);
};

/**
 * async response from db for delete board
 * @param req - request object , unuse
 * @param res - Fastify response object
 * @returns return void with 204 code
 */

export const deleteBoard = async (req: FastifyRequest, res: FastifyReply) => {
  const { boardId } = req.params as RequestParams;
  findId(boardRepo.boards, res, boardId);
  await boardRepo.deleteBoard(boardId);
  await deleteAllTasks(req);

  await res.code(HttpStatus.NO_CONTENT).send();
};

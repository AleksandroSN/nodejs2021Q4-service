import { DeleteResult, getRepository } from "typeorm";
import { Board } from "./board.model";
import type { dataModels } from "../../types";

/**
 * Get all boards from PGTable Boards
 * @returns `Promise<dataModels.BoardModel[]>`
 */

const getAllBoards = async (): Promise<dataModels.BoardModel[]> =>
  getRepository(Board).find();

/**
 * Add new board to PGTable Boards
 * @returns `Promise<dataModels.BoardModel>`
 */

const addBoard = async (
  body: dataModels.BoardModel
): Promise<dataModels.BoardModel> => {
  const board = await getRepository(Board).save(body);
  return board;
};

/**
 * Get one board on id from PGTable Boards
 * @returns `Promise<dataModels.BoardModel>`
 */

const findBoard = async (
  id: string
): Promise<dataModels.BoardModel | undefined> => {
  const board = await getRepository(Board).findOne(id);
  return board;
};

/**
 * Update board on id from PGTable Boards
 * @returns `Promise<dataModels.BoardModel>`
 */

const updateBoard = async (
  id: string,
  body: dataModels.BoardModel
): Promise<dataModels.BoardModel> => {
  const boardsRepository = getRepository(Board);
  const board = await boardsRepository.findOne(id);
  const updatedBoard = { ...board, ...body } as dataModels.BoardModel;
  const result = await boardsRepository.save(updatedBoard);
  return result;
};

/**
 * Delete board on id from PGTable Boards
 * @returns `Promise<DeleteResult>`
 */

const deleteBoard = async (id: string): Promise<DeleteResult> =>
  getRepository(Board).delete(id);

export const boardRepo = {
  getAllBoards,
  addBoard,
  findBoard,
  updateBoard,
  deleteBoard,
};

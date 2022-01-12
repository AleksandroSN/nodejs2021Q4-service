import { getRepository } from "typeorm";
import { Board } from "./board.model";
import type { dataModels } from "../../types";

const getAllBoards = async (): Promise<dataModels.BoardModel[]> =>
  getRepository(Board).find();

const addBoard = async (
  body: dataModels.BoardModel
): Promise<dataModels.BoardModel> => {
  const board = await getRepository(Board).save(body);
  return board;
};

const findBoard = async (
  id: string
): Promise<dataModels.BoardModel | undefined> => {
  const board = await getRepository(Board).findOne(id);
  return board;
};

const updateBoard = async (
  id: string,
  body: dataModels.BoardModel
): Promise<dataModels.BoardModel> => {
  const board = await getRepository(Board).findOne(id);
  const updatedBoard = { ...board, ...body } as dataModels.BoardModel;
  const result = await getRepository(Board).save(updatedBoard);
  return result;
};

const deleteBoard = async (id: string) => getRepository(Board).delete(id);

export const boardRepo = {
  getAllBoards,
  addBoard,
  findBoard,
  updateBoard,
  deleteBoard,
};

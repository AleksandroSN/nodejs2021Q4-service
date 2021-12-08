import type { dataModels } from "../../types";
import { Board } from "./board.model";

interface BoardRepoModel {
  boards: dataModels.BoardModel[];
  getAllBoards(): Promise<dataModels.BoardModel[]>;
  addBoard(body: dataModels.BoardModel): Promise<Board>;
  findBoard(id: string): Promise<dataModels.BoardModel | undefined>;
  updateBoard(id: string, body: dataModels.BoardModel): Promise<Board>;
  deleteBoard(id: string): Promise<null>;
}

/**
 * class for work with boards array (InMemoryDB)
 * @param boards - array boards
 * @returns empty boards arr
 */
class BoardRepo implements BoardRepoModel {
  boards: dataModels.BoardModel[];

  constructor() {
    this.boards = [];
  }

  async getAllBoards() {
    return Promise.resolve(this.boards);
  }

  async addBoard(body: dataModels.BoardModel) {
    const board = new Board(body);
    this.boards.push(board);
    return Promise.resolve(board);
  }

  async findBoard(id: string) {
    const result = this.boards.find((board) => board.id === id);
    return Promise.resolve(result);
  }

  async updateBoard(id: string, body: dataModels.BoardModel) {
    const boardIdx = this.boards.findIndex((board) => board.id === id);
    const updatedBoard = {
      ...this.boards[boardIdx],
      ...body,
    } as dataModels.BoardModel;
    this.boards.splice(boardIdx, 1, updatedBoard);
    return Promise.resolve(updatedBoard);
  }

  async deleteBoard(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
    return Promise.resolve(null);
  }
}

export const boardRepo = new BoardRepo();

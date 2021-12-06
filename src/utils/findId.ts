import type { FastifyReply } from "fastify";
import { HttpStatus } from "./constants";
import type { dataModels } from "../types";

type DataModel =
  | dataModels.UserModel[]
  | dataModels.BoardModel[]
  | dataModels.TaskModel[];

/**
 * Search element in array
 * @param arr - required array
 * @param res - response from API
 * @param id - sought identification number
 * @returns Returns void
 */

export const findId = (arr: DataModel, res: FastifyReply, id: string): void => {
  const findIdx = arr.findIndex((el) => el.id === id);
  if (findIdx < 0) {
    res.code(HttpStatus.NOT_FOUND).send(`${id} not found`);
  }
};

import type { FastifyReply } from "fastify";
import { validate as uuidValidate } from "uuid";
import { HttpStatus } from "../utils";

/**
 * Validate id, if wrond send response with message
 * @param res - fastify reply
 * @param ids - array strings
 * @returns function return void
 */

export const validateId = (res: FastifyReply, ids: string[]): void => {
  if (!Array.isArray(ids)) return;
  const isValidIds = ids.map((id) => uuidValidate(id));
  isValidIds.forEach((id) => {
    if (id === false) {
      res.code(HttpStatus.BAD_REQUEST).send("wrong uuid format");
    }
  });
};

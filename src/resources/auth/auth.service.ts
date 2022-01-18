import type { FastifyReply, FastifyRequest } from "fastify";
import type { dataModels } from "../../types";
import { HttpStatus } from "../../utils";

export const authHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as dataModels.AuthModel;
  res.status(HttpStatus.CREATED).send(body);
};

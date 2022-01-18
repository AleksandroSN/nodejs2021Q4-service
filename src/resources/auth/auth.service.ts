import type { FastifyReply, FastifyRequest } from "fastify";
import type { dataModels } from "../../types";

export const authHandler = (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as dataModels.AuthModel;
  res.send(body);
};

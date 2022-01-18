import type { FastifyReply, FastifyRequest } from "fastify";
import type { dataModels } from "../../types";
import { HttpStatus } from "../../utils";
import { checkUserInDB } from "./auth.repository";

export const authHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { login } = req.body as dataModels.AuthModel;
  const existedUser = await checkUserInDB(login, res);
  const token = await res.jwtSign(
    { userId: existedUser?.id, login },
    { sign: { expiresIn: "10m", algorithm: "HS256" } }
  );
  res.status(HttpStatus.OK).send(token);
};

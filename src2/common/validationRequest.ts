import type { FastifyReply, FastifyRequest } from "fastify";
import type { RequestParams } from "../types";
import { checkPath } from "./checkPath";
import { validateId } from "./validateId";

export const validationRequest = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const { params, url } = req;
  const reqParams = params as RequestParams;
  const wrongPath = reqParams["*"];
  const paramValues = Object.values(reqParams);
  try {
    await checkPath(req, url);
    if (wrongPath === undefined && paramValues.length > 0) {
      validateId(res, paramValues);
    }
  } catch (error) {
    res.send(error);
  }
};

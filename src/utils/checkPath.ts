import type { FastifyRequest } from "fastify";
import {} from "fastify-jwt";

export const checkPath = async (
  req: FastifyRequest,
  path: string
): Promise<null | void> => {
  const RegEx = /(?:\/users|\/boards)/i;
  const pathIsRestricted = RegEx.test(path);
  if (!req) return null;
  if (pathIsRestricted) await req.jwtVerify();
  return null;
};

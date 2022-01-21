import type { FastifyRequest } from "fastify";

export const checkPath = async (
  req: FastifyRequest,
  path: string
): Promise<void> => {
  const RegEx = /(?:\/users|\/boards)/i;
  const pathIsRestricted = RegEx.test(path);
  if (pathIsRestricted) await req.jwtVerify();
};

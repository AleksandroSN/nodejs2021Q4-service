import fastify, { FastifyInstance } from "fastify";
import fastifyJWT from "fastify-jwt";
import swagger from "fastify-swagger";
import { usersRoute } from "./resources/users";
import { boardsRouter } from "./resources/boards";
import { tasksRouter } from "./resources/tasks";
import { authRouter } from "./resources/auth";
import { logger } from "./logger";
import { serverOptions, swaggerOptions } from "./serverOptions";
import { JWT_SECRET_KEY, validationRequest } from "./common";
import type { RequestParams } from "./types/requestTypes";

export const app: FastifyInstance = fastify(serverOptions);

app.addHook<{ Params: RequestParams }>("onRequest", validationRequest);
app.addHook("preHandler", logger.bodyParser);

app.register(swagger, swaggerOptions);
app.register(fastifyJWT, { secret: JWT_SECRET_KEY });

app.register(usersRoute);
app.register(boardsRouter);
app.register(tasksRouter);
app.register(authRouter);

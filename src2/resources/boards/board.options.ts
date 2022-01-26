import type { RouteShorthandOptionsWithHandler } from "fastify";
import {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  checkElementInDb,
} from "./board.service";
import { board, validateBody } from "./board.helper";

/**
 * options for `/boards` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const getAllBoardsOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        items: board,
      },
    },
  },
  handler: getAllBoards,
};

/**
 * options for `/boards/:boardId` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const getBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: board,
    },
  },
  preHandler: checkElementInDb,
  handler: getBoard,
};

/**
 * options for `/boards` route and method POST.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const postBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      201: board,
    },
  },
  handler: addBoard,
};

/**
 * options for `/boards/:boardId/tasks` route and method PUT.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const putBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      200: board,
    },
  },
  preHandler: checkElementInDb,
  handler: updateBoard,
};

/**
 * options for `/boards/:boardId/tasks` route and method DELETE.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const deleteBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  preHandler: checkElementInDb,
  handler: deleteBoard,
};

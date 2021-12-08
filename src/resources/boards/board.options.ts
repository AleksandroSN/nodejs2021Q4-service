import type { RouteShorthandOptionsWithHandler } from "fastify";
import {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from "./board.service";
import { board, validateBody } from "./board.helper";

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

export const getBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: getBoard,
};

export const postBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      201: board,
    },
  },
  handler: addBoard,
};

export const putBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      200: board,
    },
  },
  handler: updateBoard,
};

export const deleteBoardOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteBoard,
};

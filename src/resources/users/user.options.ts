import type { RouteShorthandOptionsWithHandler } from "fastify";
import {
  userWithPassword,
  userWithoutPassword,
  validateBody,
} from "./user.helper";
import {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "./user.service";

export const getAllUsersOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        items: userWithPassword,
      },
    },
  },
  handler: getAllUsers,
};

export const getUserOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: userWithoutPassword,
    },
  },
  handler: getUser,
};

export const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      201: userWithoutPassword,
    },
  },
  handler: addUser,
};

export const putOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      200: userWithoutPassword,
    },
  },
  handler: updateUser,
};

export const deleteOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteUser,
};

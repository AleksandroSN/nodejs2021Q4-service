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

/**
 * options for `/users` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

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

/**
 * options for `/users/:userId` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */
export const getUserOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: userWithoutPassword,
    },
  },
  handler: getUser,
};

/**
 * options for `/users` route and method POST.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      201: userWithoutPassword,
    },
  },
  handler: addUser,
};

/**
 * options for `/users/:userId` route and method PUT.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const putOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: validateBody,
    response: {
      200: userWithoutPassword,
    },
  },
  handler: updateUser,
};

/**
 * options for `/users/:userId` route and method DELETE.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const deleteOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteUser,
};

import type { RouteShorthandOptionsWithHandler } from "fastify";
import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  checkElementInDb,
} from "./tasks.service";
import { task } from "./task.helper";

/**
 * options for `/boards/:boardId/tasks` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const getAllTasksOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        items: task,
      },
    },
  },
  handler: getAllTasks,
};

/**
 * options for `/boards/:boardId/tasks/:taskId` route and method GET.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const getTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: task,
    },
  },
  preHandler: checkElementInDb,
  handler: getTask,
};

/**
 * options for `/boards/:boardId/tasks` route and method POST.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: task,
    response: {
      201: task,
    },
  },
  handler: addTask,
};

/**
 * options for `/boards/:boardId/tasks/:taskId` route and method PUT.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const putOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: task,
    response: {
      200: task,
    },
  },
  preHandler: checkElementInDb,
  handler: updateTask,
};

/**
 * options for `/boards/:boardId/tasks/:taskId` route and method DELETE.
 * For more information click to link below:
 * @see {@link https://www.fastify.io/docs/latest/Routes/#options}
 */

export const deleteOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  preHandler: checkElementInDb,
  handler: deleteTask,
};

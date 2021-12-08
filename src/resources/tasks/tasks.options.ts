import type { RouteShorthandOptionsWithHandler } from "fastify";
import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from "./tasks.service";
import { task } from "./task.helper";

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

export const getTaskOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: getTask,
};

export const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: task,
    response: {
      201: task,
    },
  },
  handler: addTask,
};

export const putOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: task,
    response: {
      200: task,
    },
  },
  handler: updateTask,
};

export const deleteOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteTask,
};

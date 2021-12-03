const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("./tasks.service");
const { board, validateBody } = require("./task.helper");

const getAllTasksOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: board,
      },
    },
  },
  handler: getAllTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: getTask,
};

const postOpts = {
  schema: {
    body: validateBody,
    response: {
      201: board,
    },
  },
  handler: addTask,
};

const putOpts = {
  schema: {
    body: validateBody,
    response: {
      200: board,
    },
  },
  handler: updateTask,
};

const deleteOpts = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteTask,
};

module.exports = {
  getAllTasksOpts,
  getTaskOpts,
  postOpts,
  putOpts,
  deleteOpts,
};

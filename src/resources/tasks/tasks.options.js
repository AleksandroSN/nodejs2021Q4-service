const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("./tasks.service");
const { task, validateBody } = require("./task.helper");

const getAllTasksOpts = {
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

const getTaskOpts = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: getTask,
};

const postOpts = {
  schema: {
    body: validateBody,
    response: {
      201: task,
    },
  },
  handler: addTask,
};

const putOpts = {
  schema: {
    body: validateBody,
    response: {
      200: task,
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

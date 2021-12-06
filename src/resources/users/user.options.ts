const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("./user.service");
const {
  userWithPassword,
  userWithoutPassword,
  validateBody,
} = require("./user.helper");

const getAllUsersOpts = {
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

const getUserOpts = {
  schema: {
    response: {
      200: userWithoutPassword,
    },
  },
  handler: getUser,
};

const postOpts = {
  schema: {
    body: validateBody,
    response: {
      201: userWithoutPassword,
    },
  },
  handler: addUser,
};

const putOpts = {
  schema: {
    body: validateBody,
    response: {
      200: userWithoutPassword,
    },
  },
  handler: updateUser,
};

const deleteOpts = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteUser,
};

module.exports = {
  getAllUsersOpts,
  getUserOpts,
  postOpts,
  putOpts,
  deleteOpts,
};

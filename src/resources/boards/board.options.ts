const {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require("./board.service");
const { board, validateBody } = require("./board.helper");

const getAllBoardsOpts = {
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

const getBoardOpts = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
  schema: {
    body: validateBody,
    response: {
      201: board,
    },
  },
  handler: addBoard,
};

const putBoardOpts = {
  schema: {
    body: validateBody,
    response: {
      200: board,
    },
  },
  handler: updateBoard,
};

const deleteBoardOpts = {
  schema: {
    response: {
      204: {},
    },
  },
  handler: deleteBoard,
};

module.exports = {
  getAllBoardsOpts,
  getBoardOpts,
  postBoardOpts,
  putBoardOpts,
  deleteBoardOpts,
};

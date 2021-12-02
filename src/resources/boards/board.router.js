const {
  getAllBoardsOpts,
  getBoardOpts,
  putBoardOpts,
  postBoardOpts,
  deleteBoardOpts,
} = require("./board.options");

const boardsRouter = (app, options, done) => {
  app.get("/boards", getAllBoardsOpts);

  app.get("/boards/:boardId", getBoardOpts);

  app.post("/boards", postBoardOpts);

  app.put("/boards/:boardId", putBoardOpts);

  app.delete("/boards/:boardId", deleteBoardOpts);

  done();
};

module.exports = boardsRouter;

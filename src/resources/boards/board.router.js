const router = require("express").Router();
const User = require("./board.model");
const usersService = require("./board.service");

router.route("/").get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

const boardsRoute = (app, options, done) => {
  app.get("/boards", (_, res) => {
    res.send("BOARDS");
  });

  app.get("/boards/:boardId", (req, res) => {
    const { boardId } = req.params;
    res.send(boardId);
  });

  app.post("/boards", (req, res) => {
    res.send("POST BOARDS");
  });

  app.put("/boards/:boardId", (req, res) => {
    const { boardId } = req.params;
    res.send(`PUT BOARDS ${boardId}`);
  });

  app.delete("/boards/:boardId", (req, res) => {
    const { boardId } = req.params;
    res.send(`DELETE BOARDS ${boardId}`);
  });

  done();
};

module.exports = boardsRoute;

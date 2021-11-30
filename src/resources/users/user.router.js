const router = require("express").Router();
const User = require("./user.model");
const usersService = require("./user.service");

router.route("/").get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

const usersRoute = (app, options, done) => {
  app.get("/users", (_, res) => {
    res.send("USERS");
  });

  app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;
    res.send(userId);
  });

  app.post("/users", (req, res) => {
    res.send("POST USERS");
  });

  app.put("/users/:userId", (req, res) => {
    const { userId } = req.params;
    res.send(`PUT USERS ${userId}`);
  });

  app.delete("/users/:userId", (req, res) => {
    const { userId } = req.params;
    res.send(`DELETE USERS ${userId}`);
  });

  done();
};

module.exports = usersRoute;

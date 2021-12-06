const {
  getAllUsersOpts,
  getUserOpts,
  postOpts,
  putOpts,
  deleteOpts,
} = require("./user.options");

const usersRoute = (app, options, done) => {
  app.get("/users", getAllUsersOpts);

  app.get("/users/:userId", getUserOpts);

  app.post("/users", postOpts);

  app.put("/users/:userId", putOpts);

  app.delete("/users/:userId", deleteOpts);

  done();
};

module.exports = usersRoute;

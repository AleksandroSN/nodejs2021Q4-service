const usersRepo = require("./tasks.memory.repository");

const getAll = () => usersRepo.getAll();

module.exports = { getAll };

const { HTTP_STATUS } = require("./constants");

const findId = (arr, res, id) => {
  const findIdx = arr.findIndex((el) => el.id === id);
  if (findIdx < 0) {
    res.code(HTTP_STATUS.NOT_FOUND).send(`${id} not found`);
  }
  return findIdx;
};

module.exports = findId;

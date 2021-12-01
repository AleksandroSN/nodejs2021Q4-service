const { validate: uuidValidate } = require("uuid");
const { HTTP_STATUS } = require("./constants");

const validateId = (res, id) => {
  const isValidId = uuidValidate(id);
  if (!isValidId) res.code(HTTP_STATUS.BAD_REQUEST).send("wrong uuid format");
  return isValidId;
};

module.exports = validateId;

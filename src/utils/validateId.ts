const { validate: uuidValidate } = require("uuid");
const { HTTP_STATUS } = require("./constants");

const validateId = (res, ids) => {
  if (!Array.isArray(ids)) return;
  const isValidIds = ids.map((id) => uuidValidate(id));
  isValidIds.forEach((id) => {
    if (id === false) {
      res.code(HTTP_STATUS.BAD_REQUEST).send("wrong uuid format");
    }
  });
};

module.exports = validateId;

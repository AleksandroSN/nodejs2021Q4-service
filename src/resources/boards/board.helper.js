const column = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    order: { type: "integer" },
  },
};

const columns = {
  type: "array",
  items: column,
};

const board = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    columns,
  },
};

const validateBody = {
  type: "object",
  required: ["title"],
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    columns,
  },
};

module.exports = {
  board,
  validateBody,
};

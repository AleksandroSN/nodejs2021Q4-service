const task = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    order: { type: "integer" },
    description: { type: "string" },
    userId: { type: ["string", "null"] },
    boardId: { type: ["string", "null"] },
    columnId: { type: ["string", "null"] },
  },
};

const validateBody = {
  type: "object",
  // required: ["boardId"],
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    order: { type: "integer" },
    description: { type: "string" },
    userId: { type: ["string", "null"] },
    boardId: { type: ["string", "null"] },
    columnId: { type: ["string", "null"] },
  },
};

module.exports = {
  task,
  validateBody,
};

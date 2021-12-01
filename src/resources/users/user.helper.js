const userWithPassword = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
    password: { type: "string" },
  },
};

const userWithoutPassword = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
  },
};

const validateBody = {
  type: "object",
  required: ["name"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    login: { type: "string" },
    password: { type: "string" },
  },
};

module.exports = {
  userWithPassword,
  userWithoutPassword,
  validateBody,
};

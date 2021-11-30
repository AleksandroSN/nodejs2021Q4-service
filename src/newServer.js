const app = require("fastify")({ logger: true });
const { PORT_ENV } = require("./common");

const PORT = PORT_ENV || 9999;

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

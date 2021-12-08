import { app, PORT } from "./app";

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`START as ${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

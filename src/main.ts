import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { generateAdapter } from "./server";
import { logUncaughtException, logUnhandledRejection } from "./logger";
import type { AppConfig } from "./configs";

logUncaughtException();
logUnhandledRejection();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, generateAdapter(), {
    logger: false,
  });
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  app.useLogger(logger);

  const { PORT, BASE_HOST } = configService.get<AppConfig>("appConfig");

  await app.listen(PORT, BASE_HOST);
  process.stdout.write(`START at http://${BASE_HOST}:${PORT} \n`);
}
bootstrap();

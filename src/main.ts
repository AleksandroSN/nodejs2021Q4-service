import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { generateAdapter } from "./server";
import type { AppConfig } from "./configs/config.inteface";
import {
  logUncaughtException,
  logUnhandledRejection,
} from "./logger/uncaugthExcep";

logUncaughtException();
logUnhandledRejection();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, generateAdapter());
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);

  app.useLogger(logger);

  const { PORT, BASE_HOST } = configService.get<AppConfig>("appConfig");
  await app.listen(PORT, BASE_HOST);
}
bootstrap();

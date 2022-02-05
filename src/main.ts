import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { generateAdapter } from "./server";
import { logUncaughtException, logUnhandledRejection } from "./logger";
import type { AppConfig } from "./configs";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

logUncaughtException();
logUnhandledRejection();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, generateAdapter(), {
    logger: false,
  });
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  const { PORT, BASE_HOST } = configService.get<AppConfig>("appConfig");

  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle("NestJS API")
    .setDescription("Let's try to create a competitor for Trello!")
    .addServer(`http://${BASE_HOST}:${PORT}`)
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(PORT, BASE_HOST);
  process.stdout.write(`START at http://${BASE_HOST}:${PORT} \n`);
}
bootstrap();

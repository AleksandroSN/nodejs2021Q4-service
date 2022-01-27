import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import type { AppConfig } from "./configs/config.inteface";

// TODO move config in config class
async function bootstrap() {
  const isFastify = process.env["USE_FASTIFY"];
  const Adapter = isFastify === "true" ? FastifyAdapter : ExpressAdapter;
  const app = await NestFactory.create(AppModule, new Adapter());
  const configService = app.get(ConfigService);
  const { PORT, BASE_HOST } = configService.get<AppConfig>("appConfig");
  await app.listen(PORT, BASE_HOST);
}
bootstrap();

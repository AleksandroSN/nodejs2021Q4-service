import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigLoggerService } from "./logger.service";

@Module({
  imports: [ConfigModule],
  providers: [ConfigLoggerService],
  exports: [ConfigLoggerService],
})
export class ConfigLoggerModule {}

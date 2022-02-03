import { forwardRef, Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { LoggingInterceptor } from "./logger.interceptor.service";

@Module({
  imports: [forwardRef(() => LoggerModule)],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
})
export class LoggerInterceptorModule {}

import { forwardRef, Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { AllExceptionsFilter } from "./all-exception.filter";

@Module({
  imports: [forwardRef(() => LoggerModule)],
  providers: [AllExceptionsFilter],
  exports: [AllExceptionsFilter],
})
export class ExceptionModule {}

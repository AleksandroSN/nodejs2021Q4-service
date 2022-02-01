import { Module } from "@nestjs/common";
import { AllExceptionsFilter } from "./all-exception.filter";

@Module({
  providers: [AllExceptionsFilter],
  exports: [AllExceptionsFilter],
})
export class ExceptionModule {}

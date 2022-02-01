// import * as path from "path";
import { Module, Scope } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AuthModule,
  BoardsModule,
  // FilesModule,
  TasksModule,
  UsersModule,
} from "./resources";

import appConfig from "./configs/appConfig";
import databaseConfig from "./configs/database.config";
import { DatabaseConfig } from "./configs/database.config.module";
import { ConfigLoggerService } from "./logger/logger.service";
import { ConfigLoggerModule } from "./logger/logger.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./interceptors/logger.interceptor.service";
import { LoggerInterceptorModule } from "./interceptors/logger.iterceptor.module";
import { ExceptionModule } from "./exceptions/exceptions.module";
import { AllExceptionsFilter } from "./exceptions/all-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigLoggerModule],
      inject: [ConfigLoggerService],
      useFactory: async (loggerService: ConfigLoggerService) => {
        return loggerService.getConfig();
      },
    }),
    LoggerInterceptorModule,
    ExceptionModule,
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    // FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

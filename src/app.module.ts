import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { Module, Scope, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AuthModule,
  BoardsModule,
  FilesModule,
  TasksModule,
  UsersModule,
} from "./resources";
import { ExceptionModule, AllExceptionsFilter } from "./exceptions";
import { LoggerInterceptorModule, LoggingInterceptor } from "./interceptors";
import { ConfigLoggerModule, ConfigLoggerService } from "./logger";
import { appConfig, databaseConfig, DatabaseConfigFactory } from "./configs";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigFactory,
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
    FilesModule,
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
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}

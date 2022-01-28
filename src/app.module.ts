import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    // FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

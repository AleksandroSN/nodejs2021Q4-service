import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AuthModule,
  BoardsModule,
  FilesModule,
  TasksModule,
  UsersModule,
} from "./resources";

import config from "./configs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [config],
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

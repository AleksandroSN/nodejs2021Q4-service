import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  // AuthModule,
  // BoardsModule,
  // FilesModule,
  // TasksModule,
  UsersModule,
} from "./resources";

import config from "./configs/config";
import { User } from "./resources/users/users.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5000,
      username: "postgres",
      password: "qwerty3355",
      database: "fastify_db",
      synchronize: true,
      logging: false,
      migrationsRun: false,
      dropSchema: false,
      entities: [User],
      // migrations: ["src/migration/**/*{.js,.ts}"],
      // subscribers: ["dist/resources/**/*{.js,.ts}"],
      // cli: {
      //   entitiesDir: "src/resources",
      //   migrationsDir: "src/migration",
      //   subscribersDir: "src/resources",
      // },
    }),
    UsersModule,
    // BoardsModule,
    // TasksModule,
    // AuthModule,
    // FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";
import { TaskRepository } from "../tasks/task.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository, TaskRepository])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

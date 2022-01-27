import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { Task } from "../tasks/tasks.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

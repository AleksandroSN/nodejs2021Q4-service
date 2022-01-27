import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "../tasks/tasks.entity";
import { BoardsController } from "./boards.controller";
import { Board } from "./boards.entity";
import { BoardsService } from "./boards.service";

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

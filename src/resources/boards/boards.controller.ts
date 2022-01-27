import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Board } from "./boards.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(":boardid")
  findOne(@Param("boardid") id: string): Promise<Board> {
    return this.boardsService.findBoard(id);
  }

  @Post()
  addOne(@Body() dto: CreateBoardDTO): Promise<Board> {
    return this.boardsService.addBoard(dto);
  }

  @Put(":boardid")
  updateOne(
    @Body() dto: UpdateBoardDTO,
    @Param("boardid") id: string
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, dto);
  }

  @Delete(":boardid")
  deleteOne(@Param("boardid") id: string): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtGuard } from "../auth/jwt-guard";
import { Board } from "./boards.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@Controller("boards")
@ApiTags("Boards")
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @ApiOperation({ summary: "Get All Boards" })
  @ApiResponse({ status: 200, type: [Board] })
  findAll(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(":boardid")
  @ApiOperation({ summary: "Get one Board" })
  @ApiParam({ name: "boardid", description: "string in UUID format" })
  @ApiResponse({ status: 200, type: Board })
  findOne(@Param("boardid", ParseUUIDPipe) id: string): Promise<Board> {
    return this.boardsService.findBoard(id);
  }

  @Post()
  @ApiOperation({ summary: "Add new Board" })
  @ApiResponse({ status: 201, type: Board })
  @ApiBody({ type: Board })
  addOne(@Body() dto: CreateBoardDTO): Promise<Board> {
    return this.boardsService.addBoard(dto);
  }

  @Put(":boardid")
  @ApiOperation({ summary: "Update one Board" })
  @ApiParam({ name: "boardid", description: "string in UUID format" })
  @ApiBody({ type: Board })
  @ApiResponse({ status: 200, type: Board })
  updateOne(
    @Body() dto: UpdateBoardDTO,
    @Param("boardid", ParseUUIDPipe) id: string
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, dto);
  }

  @Delete(":boardid")
  @ApiOperation({ summary: "Delete one Board with all Columns and Tasks" })
  @ApiParam({ name: "boardid", description: "string in UUID format" })
  @ApiResponse({
    status: 200,
    type: "User with id 5e5f848d-48b5-49ee-9fd3-933ea34bba3b is deleted",
    description: "Response with next text: Board with id UUID is deleted",
  })
  deleteOne(@Param("boardid", ParseUUIDPipe) id: string): Promise<string> {
    return this.boardsService.deleteBoard(id);
  }
}

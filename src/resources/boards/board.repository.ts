import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { UpdateBoardDTO } from "./dto/update-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async findAllBoards(): Promise<Board[]> {
    return await this.find();
  }

  async findBoardById(id: string): Promise<Board> {
    return await this.findOne(id);
  }

  async createBoard(dto: CreateBoardDTO): Promise<Board> {
    return await this.save(dto);
  }

  async updateBoard(id: string, dto: UpdateBoardDTO): Promise<Board> {
    const board = await this.findOne(id);
    const updatedBoard = { ...board, ...dto } as Board;
    return await this.save(updatedBoard);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }
}

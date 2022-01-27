import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./users.entity";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async addUser(dto: CreateUserDTO): Promise<User> {
    const newUser = new User(dto);
    return this.usersRepository.save(newUser);
  }

  async findUser(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async updateUser(id: string, dto: CreateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const updatedUser = { ...user, ...dto } as User;
    const userWithoutPass = new User(updatedUser);
    return this.usersRepository.save(userWithoutPass);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}

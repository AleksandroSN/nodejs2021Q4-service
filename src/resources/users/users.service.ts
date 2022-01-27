import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomName } from "src/utils";
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
    const userName = randomName(dto.name);
    const userWithName = {
      ...dto,
      ...{ name: userName },
    } as User;
    const newUser = new User(userWithName);
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
    // resetUser
    return this.usersRepository.delete(id);
  }
}

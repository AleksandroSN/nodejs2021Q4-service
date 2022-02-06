import { ConflictException } from "@nestjs/common";
import {
  DeleteResult,
  EntityRepository,
  QueryFailedError,
  Repository,
} from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async findUserById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async findUserByLogin(login: string): Promise<User> {
    return await this.findOne({ login });
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const newUser = new User(dto);
    try {
      const user = await this.save(newUser);
      return user;
    } catch (error) {
      const typeORMError = error as QueryFailedError;
      throw new ConflictException(typeORMError.driverError);
    }
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = { ...user, ...dto } as User;
    const userWithoutPass = new User(updatedUser);
    return await this.save(userWithoutPass);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }
}

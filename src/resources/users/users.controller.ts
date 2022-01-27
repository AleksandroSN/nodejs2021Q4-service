import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ValidationUserPipe } from "../../pipes";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findUser(id);
  }

  @Post()
  @UsePipes(ValidationUserPipe)
  addOne(@Body() newUser: CreateUserDTO) {
    return this.userService.addUser(newUser);
  }

  @Put(":id")
  // TODO validation update user
  // @UsePipes(ValidationUserPipe)
  updateOne(@Body() updateUser: UpdateUserDTO, @Param("id") id: string) {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(":id")
  deleteOne(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  // UsePipes,
} from "@nestjs/common";
// import { ValidationUserPipe } from "../../pipes";
import { JwtGuard } from "../auth/jwt-guard";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Post()
  // @UsePipes(ValidationUserPipe)
  addOne(@Body() newUser: CreateUserDTO): Promise<User> {
    return this.userService.addUser(newUser);
  }

  @Put(":id")
  // TODO validation update user
  // @UsePipes(ValidationUserPipe)
  updateOne(
    @Body() updateUser: UpdateUserDTO,
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(":id")
  deleteOne(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}

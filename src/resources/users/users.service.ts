import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  find(): string {
    return "Hello from Users";
  }
}

import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
@ApiTags("Root")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Greeting message" })
  @ApiResponse({ status: 200, type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}

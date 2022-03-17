import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";

@Injectable()
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<ConnectionOptions> {
    const config = await this.configService.get("database");
    return config;
  }
}

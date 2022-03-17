import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [MulterModule, ConfigModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}

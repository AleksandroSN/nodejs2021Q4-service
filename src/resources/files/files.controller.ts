// import {
//   Controller,
//   Get,
//   Param,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { diskStorage } from "multer";
// import { FilesService } from "./files.service";

// @Controller("files")
// export class FilesController {
//   constructor(private readonly filesSerivice: FilesService) {}

//   @Post()
//   @UseInterceptors(
//     FileInterceptor("file", {
//       limits: {
//         fileSize: 5e6, // 5 MB
//       },
//       storage: diskStorage({
//         destination: "./static",
//         filename: (_, file, cb) => {
//           cb(null, `${file.originalname}`);
//         },
//       }),
//     })
//   )
//   uploadSingle(@UploadedFile() file) {
//     console.log(file);
//   }

//   @Get(":filename")
//   getFile(@Param("filename") filename: string) {
//     return this.filesSerivice.getFile(filename);
//   }
// }

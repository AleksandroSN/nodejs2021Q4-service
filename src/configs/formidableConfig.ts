import { PATH_TO_FILES } from "../utils";

export const formidableConfig = {
  uploadDir: PATH_TO_FILES,
  maxFileSize: 5e6, //5MB
  multiples: true,
  keepExtensions: true,
};

import { PATH_TO_FILES } from "./constants";

export const formidableConfig = {
  uploadDir: PATH_TO_FILES,
  maxFileSize: 5e6,
  multiples: true,
  keepExtensions: true,
};

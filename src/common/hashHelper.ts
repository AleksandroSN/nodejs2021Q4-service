import bcrypt from "bcrypt";
import { SALT_DEFAULT_ROUNDS } from "../utils";

export const generateHash = async (password: string): Promise<string> => {
  const hashedPassowrd = await bcrypt.hash(password, SALT_DEFAULT_ROUNDS);
  return hashedPassowrd;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const compareResult = await bcrypt.compare(password, hash);
  return compareResult;
};

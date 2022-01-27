import { hash, compare } from "bcrypt";
import { SALT_DEFAULT_ROUNDS } from "../utils";

export const generateHash = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, SALT_DEFAULT_ROUNDS);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const compareResult = await compare(password, hash);
  return compareResult;
};

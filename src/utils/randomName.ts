import { generateUsername } from "unique-username-generator";

export const randomName = (name: string): string => {
  if (name === undefined) {
    return generateUsername();
  }
  return name;
};

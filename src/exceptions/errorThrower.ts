export const errorThrower = async <T, E>(
  entity: T,
  message: string,
  error: { new (str: string | object, message: string): E }
): Promise<void> => {
  if (!entity) {
    throw new error("", `${message}`);
  }
};

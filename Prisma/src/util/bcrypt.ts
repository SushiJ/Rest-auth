import { hash, genSalt, compare } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const pass = await compare(password, hashedPassword);

  return pass;
};

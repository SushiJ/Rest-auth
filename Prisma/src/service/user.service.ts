import { omit } from "lodash";
import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../util/bcrypt";
interface UserLoginInput {
  username: string;
  password: string;
}

interface UserInput extends UserLoginInput {
  email: string;
}

const prisma = new PrismaClient();

export async function findUser({ username, password }: UserLoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  const pass = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      password: true,
    },
  });

  if (!user) return { message: "user not found" };

  const doesMatch = await comparePassword(password, pass!.password);

  if (!doesMatch) return { message: "password do not match" };

  return { message: "login success", user };
}

export async function createUser({ email, username, password }: UserInput) {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return omit(newUser, "password");
  } catch (e) {
    return e;
  }
}

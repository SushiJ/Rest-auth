import { sign, verify } from "jsonwebtoken";

export const signToken = async (payload: any) => {
  try {
    const token = sign(payload, "secret");
    return token;
  } catch (e: any) {
    return { message: "Something went wrong", e };
  }
};

export const refreshToken = async (payload: any) => {
  try {
    const token = signToken(payload);
    return token;
  } catch (e) {
    return { message: "something went wrong" };
  }
};

export const verifyToken = async (payload: any) => {
  try {
    const decoded = verify(payload, "secret");
    return decoded;
  } catch (e: any) {
    return { message: "Something went wrong", e };
  }
};

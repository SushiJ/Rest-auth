import { Request, Response } from "express";
import { findUser } from "../service/user.service";
import { refreshToken } from "../util/jwt";
import { serialize } from "cookie";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const user = await findUser(req.body);

    if (!user) return res.json("User not found");

    const token: any = await refreshToken(user);
    res.set(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        domain: "http://localhost:3000",
      })
    );
    return res.json(user);
  } catch (e) {
    return res.send(e);
  }
};

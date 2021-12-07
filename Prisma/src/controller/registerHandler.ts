import { Request, Response } from "express";
import { createUser, findUser } from "../service/user.service";
import { signToken } from "../util/jwt";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const user = await findUser(req.body);

    if (user) return res.json("User already exists");

    const newUser = await createUser(req.body);

    return res.json(newUser);
  } catch (e) {
    return res.json(e);
  }
};

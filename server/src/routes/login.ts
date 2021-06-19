import Express, { Request, Response } from "express";
import argon from "argon2";
import { User } from "../models/Users";
import jwt from "jsonwebtoken";

const login = Express.Router();

login.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User = await User.findOneOrFail({ where: { email: email } });
    const valid: boolean = await argon.verify(user.password, password);
    if (valid) {
      const accessToken: string = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET as string
      );
      res.cookie("access-token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      res.json({
        title: "Login successful.",
        description: "Redirecting to home page.",
        status: "success",
      });
    } else {
      res.json({
        title: "Login failed.",
        description: "Re-enter your credentails.",
        status: "error",
      });
    }
  } catch (err: any) {
    res.json({
      title: "User doesn't exist.",
      description: "Try resgistering an account instead.",
      status: "error",
    });
  }
});

export default login;

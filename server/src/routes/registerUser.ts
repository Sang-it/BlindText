import argon from "argon2";
import Express, { Request, Response } from "express";
import { User } from "../models/Users";

const registerUser = Express.Router();

const emailRegex =
  /(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const passRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

registerUser.post("/registerUser", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!(emailRegex.test(email) && passRegex.test(password))) {
    return res.json({
      title: "Email or Password is invalid.",
      description: "Password must have length 8.",
      status: "error",
    });
  }
  const hash = await argon.hash(password);
  req.body["password"] = hash;
  try {
    await User.save(req.body);
    return res.json({
      title: "Account created.",
      description: "Redirecting to login page.",
      status: "success",
    });
  } catch (e: any) {
    const error: string = e.detail;
    if (error.includes("email"))
      return res.json({
        title: "Email already exists.",
        description: "Try loggin in instead.",
        status: "error",
      });
    else if (error.includes("username")) {
      return res.json({
        title: "Username already exists.",
        description: "Try another username.",
        status: "error",
      });
    } else
      return res.json({
        title: "Cannot create user.",
        description: "Try again later.",
        status: "error",
      });
  }
});

export default registerUser;

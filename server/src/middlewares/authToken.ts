import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["access-token"];

  if (token === undefined) return res.sendStatus(404);
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.body = Object.assign(req.body, decoded);
  } catch {
    return res.sendStatus(403);
  }

  return next();
};

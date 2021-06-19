import Express from "express";
import { authToken } from "../middlewares/authToken";

const validateToken = Express.Router();

validateToken.post("/validateToken", authToken, (_req, res) => {
  res.json({ valid: true });
});

export default validateToken;

import Express, { Request, Response } from "express"

const logout = Express.Router()

logout.get("/logout", (_req: Request, res: Response) => {
  res.clearCookie("access-token")
  res.sendStatus(200)
})

export default logout

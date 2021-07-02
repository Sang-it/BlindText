import { authToken } from "../middlewares/authToken"
import Express, { Request, Response } from "express"
import { User } from "../models/Users"

const search = Express.Router()

search.post("/search", authToken, async (req: Request, res: Response) => {
  const { value, username } = req.body

  try {
    const users: User[] = await User.query(
      `SELECT * FROM (SELECT username,id FROM public.user WHERE username LIKE '%${value}%' ORDER BY username LIMIT 10) as foo WHERE foo.username <> '${username}'`
    )
    res.json(users)
  } catch (err) {
    console.log(err)
  }
})

search.post("/random", authToken, async (req: Request, res: Response) => {
  const { username } = req.body
  try {
    const data = await User.query(
      `SELECT * FROM (SELECT username,id FROM public.user  ORDER BY RANDOM() LIMIT 10) AS foo WHERE foo.username <> '${username}' `
    )
    res.json(data)
  } catch (err) {
    console.log(err)
  }
})

export default search

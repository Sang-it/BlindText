import Express, { Request, Response } from "express"
import { Messages } from "../models/Messages"

const getMessages = Express.Router()

getMessages.post("/message", async (req: Request, res: Response) => {
  const { room } = req.body
  const data = await Messages.query(`
  SELECT username,content from public.messages WHERE room='${room}' 
  `)
  res.json(data)
})

export default getMessages

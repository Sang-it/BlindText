import { authToken } from "../middlewares/authToken";
import Express, { Response, Request } from "express";
import { User } from "../models/Users";

const getRooms = Express.Router();

getRooms.post("/addRoom", authToken, async (req: Request, res: Response) => {
  const { title, username } = req.body;
  const user = await User.findOneOrFail({ where: { username: title } });

  if (!user.rooms.includes(username)) {
    const [user1, user2] = await User.query(
      `SELECT rooms FROM public.user WHERE username IN('${title}','${username}')
      `
    );
    {
      user2.rooms === ""
        ? await User.query(
            `UPDATE public.user SET rooms = rooms || '${title}'::varchar WHERE username = '${username}'`
          )
        : await User.query(
            `UPDATE public.user SET rooms = rooms || ',${title}'::varchar WHERE username = '${username}'`
          );
    }
    {
      user1.rooms === ""
        ? await User.query(
            `UPDATE public.user SET rooms = rooms || '${username}'::varchar WHERE username = '${title}'`
          )
        : await User.query(
            `UPDATE public.user SET rooms = rooms || ',${username}'::varchar WHERE username = '${title}'`
          );
    }
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
});

getRooms.post("/rooms", authToken, async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const user: User = await User.findOneOrFail({
      where: { id: id },
    });
    res.json(user.rooms);
  } catch {
    console.log("err");
    res.sendStatus(403);
  }
});

export default getRooms;

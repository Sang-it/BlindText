require("dotenv").config();
import "reflect-metadata";
import Express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import Cookie from "cookie-parser";
import Morgan from "morgan";
import Helmet from "helmet";
import Cors from "cors";
import registerUser from "./routes/registerUser";
import login from "./routes/login";
import validateToken from "./routes/validateToken";
import { User } from "./models/Users";
import { authToken } from "./middlewares/authToken";
import logout from "./routes/logout";
import search from "./routes/search";
import rooms from "./routes/rooms";
import http from "http";
import { Server, Socket } from "socket.io";
import { Messages } from "./models/Messages";
import msgRoute from "./routes/message";

const Main = async () => {
  const app = Express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });
    socket.on("send", async (message: string, room) => {
      await Messages.query(
        `INSERT INTO public.messages(username,content,room) VALUES ('${socket.handshake.query.username}','${message}','${room}')`
      );
      socket.to(room).emit("receive", socket.handshake.query.username, message);
    });
  });

  await createConnection({
    type: "postgres",
    database: "blindtext",
    username: "sangitmanandhar",
    password: "",
    logging: true,
    synchronize: true,
    entities: [User, Messages],
  });

  app.use(
    Cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(Cookie());
  app.use(Express.json());
  app.use(Morgan("short"));
  app.use(Helmet());
  app.use(validateToken);
  app.use(login);
  app.use(registerUser);
  app.use(logout);
  app.use(search);
  app.use(rooms);
  app.use(msgRoute);

  app.post("/user", authToken, async (req: Request, res: Response) => {
    res.json(req.body);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log("Sever is running...");
  });
};

Main();

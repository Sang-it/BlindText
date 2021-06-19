"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const registerUser_1 = __importDefault(require("./routes/registerUser"));
const login_1 = __importDefault(require("./routes/login"));
const validateToken_1 = __importDefault(require("./routes/validateToken"));
const Users_1 = require("./models/Users");
const authToken_1 = require("./middlewares/authToken");
const logout_1 = __importDefault(require("./routes/logout"));
const search_1 = __importDefault(require("./routes/search"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Messages_1 = require("./models/Messages");
const message_1 = __importDefault(require("./routes/message"));
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
        },
    });
    io.on("connection", (socket) => {
        socket.on("joinRoom", (room) => {
            socket.join(room);
        });
        socket.on("send", (message, room) => __awaiter(void 0, void 0, void 0, function* () {
            yield Messages_1.Messages.query(`INSERT INTO public.messages(username,content,room) VALUES ('${socket.handshake.query.username}','${message}','${room}')`);
            socket.to(room).emit("receive", socket.handshake.query.username, message);
        }));
    });
    yield typeorm_1.createConnection({
        type: "postgres",
        database: "blindtext",
        username: "sangitmanandhar",
        password: "",
        logging: true,
        synchronize: true,
        entities: [Users_1.User, Messages_1.Messages],
    });
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(cookie_parser_1.default());
    app.use(express_1.default.json());
    app.use(morgan_1.default("short"));
    app.use(helmet_1.default());
    app.use(validateToken_1.default);
    app.use(login_1.default);
    app.use(registerUser_1.default);
    app.use(logout_1.default);
    app.use(search_1.default);
    app.use(rooms_1.default);
    app.use(message_1.default);
    app.post("/user", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(req.body);
    }));
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        console.log("Sever is running...");
    });
});
Main();
//# sourceMappingURL=index.js.map
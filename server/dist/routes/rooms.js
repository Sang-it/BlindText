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
const authToken_1 = require("../middlewares/authToken");
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const getRooms = express_1.default.Router();
getRooms.post("/addRoom", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, username } = req.body;
    const user = yield Users_1.User.findOneOrFail({ where: { username: title } });
    if (!user.rooms.includes(username)) {
        const [user1, user2] = yield Users_1.User.query(`SELECT rooms FROM public.user WHERE username IN('${title}','${username}')
      `);
        {
            user2.rooms === ""
                ? yield Users_1.User.query(`UPDATE public.user SET rooms = rooms || '${title}'::varchar WHERE username = '${username}'`)
                : yield Users_1.User.query(`UPDATE public.user SET rooms = rooms || ',${title}'::varchar WHERE username = '${username}'`);
        }
        {
            user1.rooms === ""
                ? yield Users_1.User.query(`UPDATE public.user SET rooms = rooms || '${username}'::varchar WHERE username = '${title}'`)
                : yield Users_1.User.query(`UPDATE public.user SET rooms = rooms || ',${username}'::varchar WHERE username = '${title}'`);
        }
        return res.sendStatus(200);
    }
    return res.sendStatus(500);
}));
getRooms.post("/rooms", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield Users_1.User.findOneOrFail({
            where: { id: id },
        });
        res.json(user.rooms);
    }
    catch (_a) {
        console.log("err");
        res.sendStatus(403);
    }
}));
exports.default = getRooms;
//# sourceMappingURL=rooms.js.map
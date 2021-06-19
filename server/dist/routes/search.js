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
const search = express_1.default.Router();
search.post("/search", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, username } = req.body;
    try {
        const users = yield Users_1.User.query(`SELECT * FROM (SELECT username,id FROM public.user WHERE username LIKE '%${value}%' ORDER BY username LIMIT 10) as foo WHERE foo.username <> '${username}'`);
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
}));
search.post("/random", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const data = yield Users_1.User.query(`SELECT * FROM (SELECT username,id FROM public.user  ORDER BY RANDOM() LIMIT 10) AS foo WHERE foo.username <> '${username}' `);
    res.json(data);
}));
exports.default = search;
//# sourceMappingURL=search.js.map
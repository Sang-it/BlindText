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
const express_1 = __importDefault(require("express"));
const argon2_1 = __importDefault(require("argon2"));
const Users_1 = require("../models/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = express_1.default.Router();
login.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Users_1.User.findOneOrFail({ where: { email: email } });
        const valid = yield argon2_1.default.verify(user.password, password);
        if (valid) {
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
            res.cookie("access-token", accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30 * 1000,
            });
            res.json({
                title: "Login successful.",
                description: "Redirecting to home page.",
                status: "success",
            });
        }
        else {
            res.json({
                title: "Login failed.",
                description: "Re-enter your credentails.",
                status: "error",
            });
        }
    }
    catch (err) {
        res.json({
            title: "User doesn't exist.",
            description: "Try resgistering an account instead.",
            status: "error",
        });
    }
}));
exports.default = login;
//# sourceMappingURL=login.js.map
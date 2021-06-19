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
const argon2_1 = __importDefault(require("argon2"));
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const createUser = express_1.default.Router();
const emailRegex = /(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
createUser.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(emailRegex.test(email) && passRegex.test(password))) {
        return res.json({
            title: "Email or Password is invalid.",
            description: "Password must have length 8.",
            status: "error",
        });
    }
    const hash = yield argon2_1.default.hash(password);
    req.body["password"] = hash;
    try {
        yield Users_1.User.save(req.body);
        return res.json({
            title: "Account created.",
            description: "Redirecting to login page.",
            status: "success",
        });
    }
    catch (e) {
        const error = e.detail;
        if (error.includes("username")) {
            return res.json({
                title: "Username already exists.",
                description: "Try another username.",
                status: "error",
            });
        }
        if (error.includes("email"))
            return res.json({
                title: "Email already exists.",
                description: "Try loggin in instead.",
                status: "error",
            });
        else
            return res.json({
                title: "Cannot create user.",
                description: "Try again later.",
                status: "error",
            });
    }
}));
exports.default = createUser;
//# sourceMappingURL=createUser.js.map
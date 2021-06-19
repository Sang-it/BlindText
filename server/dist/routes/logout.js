"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logout = express_1.default.Router();
logout.get("/logout", (_req, res) => {
    res.clearCookie("access-token");
    res.sendStatus(200);
});
exports.default = logout;
//# sourceMappingURL=logout.js.map
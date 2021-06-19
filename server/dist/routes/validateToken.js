"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = require("../middlewares/authToken");
const validateToken = express_1.default.Router();
validateToken.post("/validateToken", authToken_1.authToken, (_req, res) => {
    res.json({ valid: true });
});
exports.default = validateToken;
//# sourceMappingURL=validateToken.js.map
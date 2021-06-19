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
const Messages_1 = require("../models/Messages");
const getMessages = express_1.default.Router();
getMessages.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room } = req.body;
    const data = yield Messages_1.Messages.query(`
  SELECT username,content from public.messages WHERE room='${room}' 
  `);
    res.json(data);
}));
exports.default = getMessages;
//# sourceMappingURL=message.js.map
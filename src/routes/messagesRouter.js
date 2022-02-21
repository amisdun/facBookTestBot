import express from "express";
import { message } from "../controllers/index.js";
const MessagesRouter = express.Router();

MessagesRouter.get("/messages/:id", message.getMessageById);
MessagesRouter.get("/messages", message.getAllMessages);
MessagesRouter.get("/summary", message.getSummary);

export default MessagesRouter;

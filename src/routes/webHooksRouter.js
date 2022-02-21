import express from "express";
import { webHook } from "../controllers/index.js";
const WebRouter = express.Router();

WebRouter.get("/webhook", webHook.verifyWebhook);
WebRouter.post("/webhook", webHook.getWebHookResponse);

export default WebRouter;

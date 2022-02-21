import MessagesRouter from "./messagesRouter.js";
import WebRouter from "./webHooksRouter.js";
import express from "express";
const app = express();

app.use("", MessagesRouter);
app.use("", WebRouter);

export default app;

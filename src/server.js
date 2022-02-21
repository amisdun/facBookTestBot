import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import env from "dotenv";
import routers from "./routes/index.js";
import { dbConnection } from "./models/dbConnection.js";

const app = express();
dbConnection.connection();
env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "*/*" }));
app.use(bodyParser.text({ type: "*/*" }));
app.use(cors());
app.use("", routers);
app.get("/", (request, response) => {
	response.json({ message: "hey!!! Welcome to facebook bot" });
});

export default app;

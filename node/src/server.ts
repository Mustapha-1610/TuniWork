import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import mongoose from "mongoose";
import freelancerRouter from "./Freelancer/Router";

import companyRouter from"./Company/Router";

import adminRouter from "./Admin/Router";

import workRouter from "./Work/Router";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/freelancer", freelancerRouter);

app.use("/api/company", companyRouter);

app.use("/api/admin",adminRouter);



app.use("/api/admin", adminRouter);
app.use("/api/work", workRouter);

const server = http.createServer(app);

mongoose.Promise = Promise;
mongoose.connect(process.env.Mongo_Pass);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("open", () => {
  console.log("MongoDB connected!");
});
server.listen(5000, () => {
  console.log("Server Running !");
});

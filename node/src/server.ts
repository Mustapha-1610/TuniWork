import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import mongoose from "mongoose";
import freelancerRouter from "./Freelancer/Router";

import companyRouter from "./Company/Router";

import adminRouter from "./Admin/Router";

import workRouter from "./Work/Router";
import languagesRouter from "./utils/Languages/Router";
import CompanyWorkOfferRouter from "./WorkOffer/Company/router";
import freelancerNameSpaceLogic from "./Freelancer/freelancerSocketLogic";
import cityRouter from "./utils/City/Router";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
const serverApp = http.createServer(app);
const io = new Server(serverApp, {
  cors: {
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/freelancer", freelancerRouter);

app.use("/api/company", companyRouter);

app.use("/api/admin", adminRouter);

app.use("/api/admin", adminRouter);

app.use("/api/work", workRouter);

app.use("/api/languages", languagesRouter);

app.use("/api/companyWorkOffer", CompanyWorkOfferRouter);

app.use("/api/city", cityRouter);

mongoose.Promise = Promise;
mongoose.connect(process.env.Mongo_Pass);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("open", () => {
  console.log("MongoDB connected!");
});

serverApp.listen(5000, () => {
  console.log("Server Running !");
});

const freelancerNameSpace = io.of("/freelancer");
freelancerNameSpaceLogic(freelancerNameSpace);

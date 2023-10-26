import express from "express";
import * as workController from "./controller";

const workRouter = express.Router();

workRouter.post("/create", workController.create);

export default workRouter;

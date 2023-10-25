import express from "express";
import * as adminController from "./controller";



const adminRouter = express.Router();

adminRouter.post("/create", adminController.create);


export default adminRouter;
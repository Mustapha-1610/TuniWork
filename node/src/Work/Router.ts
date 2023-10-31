import express from "express";
import * as workController from "./controller";

const workRouter = express.Router();

workRouter.post("/create", workController.create);
workRouter.get("/getWorkData", workController.getAllWorkTypes);
workRouter.post("/add", workController.addSpeciality);
workRouter.post("/getSpecialities", workController.getSpecialities);
export default workRouter;

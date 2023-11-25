import express from "express";
import * as cityController from "./Controller";

const cityRouter = express.Router();

cityRouter.post("/create", cityController.create);

//
cityRouter.post("/add", cityController.addMunicipality);

//
cityRouter.get("/getAll", cityController.getAll);

//
cityRouter.post("/getMunicipality", cityController.getMunicipality);
export default cityRouter;

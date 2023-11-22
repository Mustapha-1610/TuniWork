import express from "express";
import * as languageController from "./controller";

const languagesRouter = express.Router();

languagesRouter.post("/create", languageController.create);

//
languagesRouter.post("/add", languageController.addLanguage);

//
languagesRouter.post("/getAll", languageController.getAllLanguages);
export default languagesRouter;

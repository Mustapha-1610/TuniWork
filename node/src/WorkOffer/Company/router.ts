import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();

CompanyWorkOfferRouter.post("/create", CompanyWorkOfferController.create);

export default CompanyWorkOfferRouter;

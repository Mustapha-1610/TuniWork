import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();

CompanyWorkOfferRouter.post("/createPublicJob", CompanyWorkOfferController.createPublicJob);





// partie l private job
CompanyWorkOfferRouter.post("/createPrivateJob", CompanyWorkOfferController.createPrivateJob)
CompanyWorkOfferRouter.put('/editPrivateJob/:PrivateJobOfferId', CompanyWorkOfferController.editPrivateJob);
CompanyWorkOfferRouter.get("/getAllPrivateJobOffers", CompanyWorkOfferController.getAllPrivateJobOffers);





export default CompanyWorkOfferRouter;

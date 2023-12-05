import express from "express";
import * as CustomerWorkOfferController from "./controller";
const CustomerWorkOfferRouter = express.Router();

//CustomerWorkOfferRouter.post("/createPublicJob", CustomerWorkOfferController.createPublicJob);
CustomerWorkOfferRouter.post("/createPrivateJob", CustomerWorkOfferController.createPrivateJob);
CustomerWorkOfferRouter.put("/editPrivateJob/:PrivateJobOfferId", CustomerWorkOfferController.editPrivateJob);


CustomerWorkOfferRouter.get("/getAllPrivateJobOffers", CustomerWorkOfferController.getAllPrivateJobOffers);
export default CustomerWorkOfferRouter;

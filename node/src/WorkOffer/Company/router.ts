import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();


//partie l public job 
CompanyWorkOfferRouter.post("/createPublicJob", CompanyWorkOfferController.createPublicJob);
CompanyWorkOfferRouter.get("/:publicJobOfferId/applied-freelancers",CompanyWorkOfferController.getAppliedFreelancers);
CompanyWorkOfferRouter.get("/:publicJobOfferId",CompanyWorkOfferController.getPublicJobOffer);
CompanyWorkOfferRouter.post("/cancelPublicJobOffer/:PublicJobOfferId/:freelancerId", CompanyWorkOfferController.cancelPublicJobOffer);
CompanyWorkOfferRouter.put('/editPublicJob/:PublicJobOfferId', CompanyWorkOfferController.editPublicJob);
CompanyWorkOfferRouter.post('/acceptFreelancer/:publicJobOfferId/:freelancerId', CompanyWorkOfferController.acceptFreelancer);





// partie l private job
CompanyWorkOfferRouter.post("/createPrivateJob", CompanyWorkOfferController.createPrivateJob)
CompanyWorkOfferRouter.put('/editPrivateJob/:PrivateJobOfferId', CompanyWorkOfferController.editPrivateJob);
CompanyWorkOfferRouter.post("/cancelJobOffer/:PrivateJobOfferId/:freelancerId", CompanyWorkOfferController.cancelJobOffer);
CompanyWorkOfferRouter.get("/allJobOffers", CompanyWorkOfferController.getAllJobOffers);







export default CompanyWorkOfferRouter;

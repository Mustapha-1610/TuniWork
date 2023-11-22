import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();

CompanyWorkOfferRouter.post(
  "/createPublicJob",
  CompanyWorkOfferController.createPublicJob
);

// partie l private job
CompanyWorkOfferRouter.post(
  "/createPrivateJob",
  CompanyWorkOfferController.createPrivateJob
);
CompanyWorkOfferRouter.put(
  "/editPrivateJob/:PrivateJobOfferId",
  CompanyWorkOfferController.editPrivateJob
);
CompanyWorkOfferRouter.post(
  "/cancelJobOffer/:PrivateJobOfferId/:freelancerId",
  CompanyWorkOfferController.cancelJobOffer
);
CompanyWorkOfferRouter.get(
  "/allJobOffers",
  CompanyWorkOfferController.getAllJobOffers
);

CompanyWorkOfferRouter.get(
  "/getAllPrivateJobOffers",
  CompanyWorkOfferController.getAllPrivateJobOffers
);
CompanyWorkOfferRouter.post(
  "/getMatchingPublicWorkOffers",
  CompanyWorkOfferController.FindBestMatchesPublicWorkOffers
);
CompanyWorkOfferRouter.post(
  "/getPublicWorkOffer",
  CompanyWorkOfferController.getPublicWorkOffer
);

CompanyWorkOfferRouter.post(
  "/acceptFreelancer/:publicJobOfferId/:freelancerId",
  CompanyWorkOfferController.acceptFreelancer
);




export default CompanyWorkOfferRouter;

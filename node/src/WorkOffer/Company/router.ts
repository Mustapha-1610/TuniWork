import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();

CompanyWorkOfferRouter.post(
  "/createPublicJob",
  CompanyWorkOfferController.createPublicJob
);



CompanyWorkOfferRouter.get(
  "/getPublicJobOffer/:publicJobOfferId",
  CompanyWorkOfferController.getPublicJobOffer
);

CompanyWorkOfferRouter.get(
  "/getPublicJobDetails/:publicJobOfferId",
  CompanyWorkOfferController.getPublicJobDetails
);

CompanyWorkOfferRouter.put(
  "/editPublicJob/:PublicJobOfferId",
  CompanyWorkOfferController.editPublicJob
);

CompanyWorkOfferRouter.delete(
  //"/cancelPublicJobOffer/:freelancerId/:PublicJobOfferId", CompanyWorkOfferController.cancelPublicJobOffer
  "/cancelPublicJobOffer/:PublicJobOfferId",
  CompanyWorkOfferController.cancelPublicJobOffer
);

//get all public job offers of a company
CompanyWorkOfferRouter.get(
  "/getAllPublicJobOffers/:companyId",
  CompanyWorkOfferController.getAllPublicJobOffers
);



/************************* partie l private job ***********************/
CompanyWorkOfferRouter.post(
  "/createPrivateJob",
  CompanyWorkOfferController.createPrivateJob
);

CompanyWorkOfferRouter.put(
  "/editPrivateJob/:PrivateJobOfferId",
  CompanyWorkOfferController.editPrivateJob
);

CompanyWorkOfferRouter.delete(
  //"/cancelJobOffer/:PrivateJobOfferId/:freelancerId",
  "/cancelJobOffer/:PrivateJobOfferId",
  CompanyWorkOfferController.cancelJobOffer
);

CompanyWorkOfferRouter.get(
  "/allJobOffers/:companyId",
  CompanyWorkOfferController.getAllJobOffers
);

//get all private job offers of a company
CompanyWorkOfferRouter.get(
  "/getAllPrivateJobOffers/:companyId",
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

CompanyWorkOfferRouter.get(
  "/getPrivateJobOfferDetails/:privateJobOfferId",
  CompanyWorkOfferController.getPrivateJobOfferDetails
);

CompanyWorkOfferRouter.post(
  "/acceptFreelancer/:publicJobOfferId/:freelancerId",
  CompanyWorkOfferController.acceptFreelancer
);
// (Mustapha)
CompanyWorkOfferRouter.post(
  "/getWorkOfferInfos",
  CompanyWorkOfferController.getWorkOfferProgress
);




/**********mobile********* */

CompanyWorkOfferRouter.post(
  "/createPublicJobMobile",
  CompanyWorkOfferController.createPublicJobMobile
);

CompanyWorkOfferRouter.post(
  "/getAllPublicJobOffersMob",
  CompanyWorkOfferController.getAllPublicJobOffersMob
);

CompanyWorkOfferRouter.post(
  "/getAllPrivateJobOffersMob",
  CompanyWorkOfferController.getAllPrivateJobOffersMob
);



CompanyWorkOfferRouter.delete(
  "/cancelPublicJobOfferMob/:PublicJobOfferId",
  CompanyWorkOfferController.cancelPublicJobOfferMob
);


CompanyWorkOfferRouter.delete(
  "/cancelPrivateJobOfferMob/:PrivateJobOfferId",
  CompanyWorkOfferController.cancelPrivateJobOfferMob
);

CompanyWorkOfferRouter.post(
  "/getAllPublicJobOffersMob",
  CompanyWorkOfferController.getAllPublicJobOffersMob
);


CompanyWorkOfferRouter.post(
  "/createPrivateJobMob",
  CompanyWorkOfferController.createPrivateJobMob
);


export default CompanyWorkOfferRouter;

import express from "express";
import * as CompanyWorkOfferController from "./controller";
const CompanyWorkOfferRouter = express.Router();

CompanyWorkOfferRouter.post(
  "/createPublicJob",
  CompanyWorkOfferController.createPublicJob
);

CompanyWorkOfferRouter.get(
  "/getPublicJobOffer/:publicJobOfferId", CompanyWorkOfferController.getPublicJobOffer
)

CompanyWorkOfferRouter.get(
  "/getPublicJobDetails/:publicJobOfferId", CompanyWorkOfferController.getPublicJobDetails
)


CompanyWorkOfferRouter.put(
  "/editPublicJob/:PublicJobOfferId", CompanyWorkOfferController.editPublicJob
)

CompanyWorkOfferRouter.delete(
  //"/cancelPublicJobOffer/:freelancerId/:PublicJobOfferId", CompanyWorkOfferController.cancelPublicJobOffer
  "/cancelPublicJobOffer/:PublicJobOfferId", CompanyWorkOfferController.cancelPublicJobOffer

)

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
  "/editPrivateJob/:PrivateJobOfferId",  CompanyWorkOfferController.editPrivateJob
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

<<<<<<< HEAD

CompanyWorkOfferRouter.get(
  "/getPrivateJobOfferDetails/:privateJobOfferId",
  CompanyWorkOfferController.getPrivateJobOfferDetails
);

=======
>>>>>>> 9b28c0f9850eb9db384d434215ef19643ff80e4e
CompanyWorkOfferRouter.post(
  "/acceptFreelancer/:publicJobOfferId/:freelancerId",
  CompanyWorkOfferController.acceptFreelancer
);




export default CompanyWorkOfferRouter;

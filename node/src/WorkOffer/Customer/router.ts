import express from "express";
import * as CustomerWorkOfferController from "./controller";
const CustomerWorkOfferRouter = express.Router();

//CustomerWorkOfferRouter.post("/createPublicJob", CustomerWorkOfferController.createPublicJob);
CustomerWorkOfferRouter.post(
    "/createPrivateJob",
     CustomerWorkOfferController.createPrivateJob
     );





CustomerWorkOfferRouter.put("/editPrivateJob/:PrivateJobOfferId", CustomerWorkOfferController.editPrivateJob);


CustomerWorkOfferRouter.get("/getAllPrivateJobOffers/:customerId", CustomerWorkOfferController.getAllPrivateJobOffers);



CustomerWorkOfferRouter.get(
    "/getPrivateJobOfferDetails/:privateJobOfferId",
    CustomerWorkOfferController.getPrivateJobOfferDetails
  );



  CustomerWorkOfferRouter.delete(
   
    "/cancelJobOffer/:PrivateJobOfferId",
    CustomerWorkOfferController.cancelJobOffer
  );


  CustomerWorkOfferRouter.post(
    "/createPrivateJobCustomerMobile",
    CustomerWorkOfferController.createPrivateJobCustomerMobile
  );


export default CustomerWorkOfferRouter;

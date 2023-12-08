import express from "express";
import * as freelancerController from "./controller";

const freelancerRouter = express.Router();

freelancerRouter.post("/create", freelancerController.create);

//
freelancerRouter.post(
  "/createMobile",
  freelancerController.createMobileAccount
);

freelancerRouter.put("/verify", freelancerController.verifyAccount);

freelancerRouter.post("/auth", freelancerController.auth);

freelancerRouter.post("/profile", freelancerController.getProfile);

freelancerRouter.post("/logout", freelancerController.logout);

freelancerRouter.get(
  "/getAllFreelancers",
  freelancerController.getAllFreelancers
);

//
freelancerRouter.put("/updatePP", freelancerController.updatePP);

freelancerRouter.put("/update", freelancerController.updateInfo);

freelancerRouter.put("/disable", freelancerController.disableAccount);

freelancerRouter.put("/activate", freelancerController.activateFreelancer);

freelancerRouter.post("/multiAuth", freelancerController.multiauth);

freelancerRouter.post("/sendLink", freelancerController.sendVerificationLink);

freelancerRouter.post(
  "/sendPassResetMail",
  freelancerController.sendPassResetEmail
);

freelancerRouter.put("/PassReset", freelancerController.passReset);

freelancerRouter.post("/LgoogleAuth", freelancerController.googleAuth);

//accept private joboffer (aziz)
freelancerRouter.post(
  "/acceptPrivateJob",
  freelancerController.acceptPrivateJob
);

//decline private joboffer (aziz)
freelancerRouter.post(
  "/declinePrivateJob/:jobId",
  freelancerController.declinePrivateJob
);

//apply for a public job (aziz)
freelancerRouter.post(
  "/applyForPublicJob",
  freelancerController.applyForPublicJob
);

//
freelancerRouter.put("/unapplyPWO", freelancerController.unapplyForPWO);

//
freelancerRouter.put("/savePWO", freelancerController.savePublicJobOffer);

//
freelancerRouter.put("/unsavePWO", freelancerController.unsavePWO);

//
freelancerRouter.post("/filterPWOSearch", freelancerController.filterPWOSearch);

//
freelancerRouter.post(
  "/sendFreelancerContract",
  freelancerController.sendFreelancerContract
);

//
freelancerRouter.put("/addDate", freelancerController.addDate);

//
freelancerRouter.get("/getDate", freelancerController.getDate);

//
freelancerRouter.get("/refreshProfile", freelancerController.refreshProfile);

//
freelancerRouter.get(
  "/cleanNotifications",
  freelancerController.cleanNotification
);

//
freelancerRouter.post(
  "/updatePWOProgress",
  freelancerController.updatePWOTaskProgression
);

//
freelancerRouter.post(
  "/sendPaymentRequest",
  freelancerController.sendPaymentRequest
);

//
freelancerRouter.post(
  "/acceptWorkContract",
  freelancerController.acceptWorkContract
);

//
freelancerRouter.post(
  "/declineWorkContract",
  freelancerController.declineWorkContract
);
export default freelancerRouter;

import express from "express";
import * as freelancerController from "./controller";

const freelancerRouter = express.Router();

freelancerRouter.post("/create", freelancerController.create);

freelancerRouter.put("/verify", freelancerController.verifyAccount);

freelancerRouter.post("/auth", freelancerController.auth);

freelancerRouter.post("/profile", freelancerController.getProfile);

freelancerRouter.post("/logout", freelancerController.logout);

freelancerRouter.put(
  "/resetPassword/:freelancerId",
  freelancerController.passwordReset
);

freelancerRouter.get(
  "/getAllFreelancers",
  freelancerController.getAllFreelancers
);

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
freelancerRouter.post("/acceptPrivateJob/:jobId", freelancerController.acceptPrivateJob);

//decline private joboffer (aziz)
freelancerRouter.post("/declinePrivateJob/:jobId", freelancerController.declinePrivateJob);

//apply for a public job (aziz) 
freelancerRouter.post("/applyForPublicJob/:freelancerId/:jobOfferId", freelancerController.applyForPublicJob);


export default freelancerRouter;

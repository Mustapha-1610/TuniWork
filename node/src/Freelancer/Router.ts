import express from "express";
import * as freelancerController from "./controller";

const freelancerRouter = express.Router();

freelancerRouter.post("/create", freelancerController.create);

freelancerRouter.put(
  "/verify/:freeLancerId/:VerificationCode",
  freelancerController.verifyAccount
);

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

export default freelancerRouter;

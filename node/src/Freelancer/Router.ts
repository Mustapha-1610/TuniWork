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
<<<<<<< HEAD
=======

freelancerRouter.put(
  "/resetPassword/:freelancerId",
  freelancerController.passwordReset
);

>>>>>>> 3116b8e50aa7e3c656b6ab51ad607206c2c83f02
export default freelancerRouter;

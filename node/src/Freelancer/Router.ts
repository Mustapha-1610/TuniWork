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

freelancerRouter.put(
  "/resetPassword/:freelancerId",
  freelancerController.passwordReset
);

=======
>>>>>>> 0183fd5521e01346027ec1f79f31708a2f9ab76b
export default freelancerRouter;

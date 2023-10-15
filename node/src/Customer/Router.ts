import express from "express";
import * as customerController from "./controller";

const customerRouter = express.Router();

customerRouter.post("/createCustomerAccount", customerController.createCustomerAccount);

customerRouter.put(
  "/verify/:customerId/:VerificationCode",
  customerController.verifyAccount
);

customerRouter.post("/auth", customerController.auth);

customerRouter.post("/profile", customerController.getProfile);

customerRouter.post("/logout", customerController.logout);

export default customerRouter;

import express from "express";
import * as companyController from "./controller";

const companyRouter = express.Router();

companyRouter.post("/create", companyController.create);

companyRouter.put(
  "/verify/:companyId/:VerificationCode",
  companyController.verifyAccount
);

companyRouter.post("/auth", companyController.auth);
/*
freelancerRouter.post("/profile", freelancerController.getProfile);

freelancerRouter.post("/logout", freelancerController.logout); */
export default companyRouter; 

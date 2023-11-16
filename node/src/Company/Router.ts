import express from "express";
import * as companyController from "./controller";

const companyRouter = express.Router();

companyRouter.post("/create", companyController.create);

companyRouter.put(
  "/verify/:companyId/:VerificationCode",
  companyController.verifyAccount
);

companyRouter.post("/auth", companyController.auth);

companyRouter.post("/profile", companyController.getProfile);

companyRouter.post("/logout", companyController.logout);

companyRouter.get("/getAllCompanies", companyController.getAllCompanies);

companyRouter.put("/update", companyController.updateInfo);

companyRouter.put("/disable", companyController.disableAccount);

companyRouter.post("/saveFreelancer", companyController.saveFreelancer);

companyRouter.get("/getAllFreelancers",companyController.getAllFreelancers);

export default companyRouter;

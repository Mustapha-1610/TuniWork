import express from "express";
import * as companyController from "./controller";

const companyRouter = express.Router();

companyRouter.post("/create", companyController.create);

companyRouter.put("/verify", companyController.verifyAccount);

companyRouter.post("/sendLink", companyController.sendVerificationLink);

companyRouter.post("/auth", companyController.auth);

companyRouter.post("/profile", companyController.getProfile);

companyRouter.post("/logout", companyController.logout);

companyRouter.get("/getAllCompanies", companyController.getAllCompanies);

companyRouter.put("/update", companyController.updateInfo);

companyRouter.put("/disable/:companyId", companyController.disableAccount);
companyRouter.put("/activate/:companyId", companyController.activateCompany);

companyRouter.get("/getAllFreelancers", companyController.getAllFreelancers);

companyRouter.post(
  "/saveFreelancer/:companyId/:freelancerId",
  companyController.saveFreelancer
);
companyRouter.post(
  "/unsaveFreelancer/:companyId/:freelancerId",
  companyController.unsaveFreelancer
);

companyRouter.get(
  "/viewFreelancerDetails/:freelancerId",
  companyController.viewFreelancerDetails
);

companyRouter.get(
  "/getSavedFreelancers/:companyId",
  companyController.getSavedFreelancers
);

// (Mustapha)
companyRouter.post(
  "/acceptPaymentRequest",
  companyController.acceptPaymentRequest
);
companyRouter.post(
  "/declinePaymentRequest",
  companyController.declinePaymenyRequest
);

companyRouter.get(
  "/viewCompanyDetails/:companyId",
  companyController.viewCompanyDetails
);




export default companyRouter;

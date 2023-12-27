import express from "express";
import * as customerController from "./controller";

const customerRouter = express.Router();




customerRouter.post("/createCustomerAccount", customerController.createCustomerAccount);



customerRouter.put(
  "/update/:customerId",
  customerController.update
);


customerRouter.put(
  "/verify/:customerId/:VerificationCode",
  customerController.verifyAccount
);
//customerRouter.post('/api/customer/sendPassResetEmail', customerController.sendPassResetEmail);


customerRouter.post("/auth", customerController.auth);
customerRouter.put("/disable", customerController.disableAccount);

customerRouter.post("/profile", customerController.getProfile);
customerRouter.put("/activate", customerController.activateCustomer);
customerRouter.post("/logout", customerController.logout);
customerRouter.put("/update/:", customerController.update);
customerRouter.get("/getAllCustomer", customerController.getAllCustomers);
customerRouter.put("/ResetPassword", customerController.ResetPassword);
customerRouter.post("/sendLinkEmail", customerController.sendVerificationLink);
customerRouter.post("/LgoogleAuth", customerController.googleAuth);

<<<<<<< Updated upstream
=======

customerRouter.post("/multiauth",customerController.Mauth);
customerRouter.get("/getAllFreelancers", customerController.getAllFreelancers);

customerRouter.post(
  "/saveFreelancer/:customerId/:freelancerId",
  customerController.saveFreelancer
);
customerRouter.post(
  "/unsaveFreelancer/:customerId/:freelancerId",
  customerController.unsaveFreelancer
);

customerRouter.get(
  "/viewFreelancerDetails/:freelancerId",
  customerController.viewFreelancerDetails
);

customerRouter.get(
  "/getSavedFreelancers/:customerId",
  customerController.getSavedFreelancers
);


>>>>>>> Stashed changes



export default customerRouter;

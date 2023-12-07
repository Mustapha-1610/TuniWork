import express from "express";
import * as customerController from "./controller";

const customerRouter = express.Router();




customerRouter.post("/createCustomerAccount", customerController.createCustomerAccount);



customerRouter.put(
  "/update/:customerId",
  customerController.update
);


customerRouter.put( "/verify", customerController.verifyAccount);
customerRouter.post('/api/customer/sendPassResetEmail', customerController.sendPassResetEmail);


customerRouter.post("/authC", customerController.authC);
customerRouter.put("/disable", customerController.disableAccount);

customerRouter.post("/profile", customerController.getProfile);
customerRouter.put("/activate", customerController.activateCustomer);
customerRouter.post("/logout", customerController.logout);
customerRouter.put("/update/:", customerController.update);
customerRouter.get("/getAllCustomer", customerController.getAllCustomers);
customerRouter.put("/ResetPassword", customerController.ResetPassword);
customerRouter.post("/sendLinkEmail", customerController.sendVerificationLink);
customerRouter.post("/LgoogleAuth", customerController.googleAuth);

customerRouter.post("/multiauth",customerController.Mauth)





export default customerRouter;

<<<<<<< HEAD
import express from "express";
import * as customerController from "./controller";

const customerRouter = express.Router();

customerRouter.post("/createCustomerAccount", customerController.createCustomerAccount);



customerRouter.put(
  "/update/:customerId/:VerificationCode",
  customerController.verifyAccount
);





customerRouter.post("/auth", customerController.auth);

customerRouter.post("/profile", customerController.getProfile);

customerRouter.post("/logout", customerController.logout);



customerRouter.put("/update/:customerId", customerController.update);


export default customerRouter;
=======
>>>>>>> 30dc9dc59aaaa1632e8b75db96c9ccb8b76e67d8

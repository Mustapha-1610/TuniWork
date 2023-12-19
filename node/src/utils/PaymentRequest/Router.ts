import express from "express";
import * as PaymentRequestController from "./controller";
import * as amdminPaymentReportController from "../adminPaymentReport/controller";
const paymentRequestRouter = express.Router();

paymentRequestRouter.post("/create", PaymentRequestController.create);
paymentRequestRouter.post("/report", amdminPaymentReportController.create);
export default paymentRequestRouter;

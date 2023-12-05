import express from "express";
import * as PaymentRequestController from "./controller";

const paymentRequestRouter = express.Router();

paymentRequestRouter.post("/create", PaymentRequestController.create);
export default paymentRequestRouter;

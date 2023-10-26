import express from "express";
import * as adminController from "./controller";




const adminRouter = express.Router();

adminRouter.post("/create", adminController.create);
adminRouter.get("/get/:id",adminController.getAdminProfile);
adminRouter.put("/update/:id",adminController.updateAdmin);
adminRouter.delete("/delete/:id",adminController.deleteAdminAccount);


export default adminRouter;
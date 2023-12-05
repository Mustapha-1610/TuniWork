import { freeLancerRouteProtection } from "../../Freelancer/routeProtectionMiddleware";
import freelancer from "../../Freelancer/modal";
import company from "../../Company/modal";
import express from "express";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

import jwt from "jsonwebtoken";
import freelancer from "./modal";
import express from "express";
import { JwtPayload } from "jsonwebtoken";

// decode jwt and get back freelancer informations from the database (Mustapha)
const freeLancerRouteProtection = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.cookies.jwt) {
    return res.json({ error: "Session Expired Login" });
  } else {
    const freeLancerToken = req.cookies.jwt;
    try {
      const decoded = jwt.verify(
        freeLancerToken,
        process.env.JWT_SECRET
      ) as JwtPayload;
      let Freelancer = await freelancer.findById({ _id: decoded.freelancerId });
      return Freelancer;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Server Error !" });
    }
  }
};

export { freeLancerRouteProtection };

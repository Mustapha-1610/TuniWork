import jwt from "jsonwebtoken";
import company from "./modal";
import express from "express";
import { JwtPayload } from "jsonwebtoken";

// decode jwt and get back freelancer informations from the database (Mustapha)
const companyRouteProtection = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.cookies.jwt) {
    return res.json({ error: "Session Expired Login" });
  } else {
    const companyToken = req.cookies.jwt;
    try {
      const decoded = jwt.verify(
        companyToken,
        process.env.JWT_SECRET
      ) as JwtPayload;
      let Company = await company.findById({ _id: decoded.companyId });
      return Company;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Server Error !" });
    }
  }
};

export { companyRouteProtection };

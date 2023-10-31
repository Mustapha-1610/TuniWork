import jwt from "jsonwebtoken";
import customer from "./modal"; // Assuming you have a "customer" model
import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

//

// Decode JWT and get back customer information from the database
const customerRouteProtection = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.cookies.jwt) {
    return res.json({ error: "Session Expired Login" });
  } else {
    const customerToken = req.cookies.jwt;
    try {
      const decoded = jwt.verify(
        customerToken,
        process.env.JWT_SECRET
      ) as JwtPayload;
      let Customer = await customer.findById({ _id: decoded.customerId }); // Assuming you have a "customerId" field
      return Customer;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Server Error!" });
    }
  }
};

export { customerRouteProtection };

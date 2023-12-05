import jwt from "jsonwebtoken";
import express from "express";

// Function to generate a customer JWT upon their login
const generateCustomerToken = async (
  res: express.Response,
  customerId: any
) => {
  const token = jwt.sign({ customerId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Use secure cookies
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateCustomerToken;

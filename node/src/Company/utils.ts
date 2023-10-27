import jwt from "jsonwebtoken";
import express from "express";

// function to generate a freelancer jwt upon them loggin in (Mustapha)
const generateCompanyToken = async (
  res: express.Response,
  companyId: any
) => {
  const token = jwt.sign({ companyId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Use secure cookies
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 120 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateCompanyToken;

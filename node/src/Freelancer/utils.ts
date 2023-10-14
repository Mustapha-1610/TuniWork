import jwt from "jsonwebtoken";
import express from "express";

// function to generate a freelancer jwt upon them loggin in (Mustapha)
const generateFreelancerToken = async (
  res: express.Response,
  freelancerId: any
) => {
  const token = jwt.sign({ freelancerId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Use secure cookies
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 120 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateFreelancerToken;

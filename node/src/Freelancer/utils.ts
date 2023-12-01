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
    maxAge: 120 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
  });
  return res;
};

export default generateFreelancerToken;

import nodemailer from "nodemailer";
const user = "tuniwork40@gmail.com"; // hedhi t7ot feha l email
const pass = "rluo ouxk anej fkvt";
import jwt from "jsonwebtoken";
// transporter set up (Mustapha)
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

// send freelancer a mail upon sign up (Mustapha)
export const SendFreelancerAccountConfirmationMail = async (
  name: String,
  email: any,
  freelancerId: any,
  VerificationCode: String
) => {
  // Create a token payload
  const tokenPayload = {
    id: freelancerId,
    vcode: VerificationCode,
  };

  // Sign the token with your secret key
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); // Token expires in 24 hours
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "Freelancer Account Activation",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
  <h1>TuniWork Freelance Account Activation</h1>
  <img src="https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/OIG.png?alt=media&token=d7e717cb-e3a2-4faa-9f4f-27d4bc4cdf6c&_gl=1*1wd4x8o*_ga*MTU1NzQ5MzYxMC4xNjk2NjgwMjU2*_ga_CW55HF8NVT*MTY5NzI5NzQ0Ny44LjEuMTY5NzI5ODgwMS4yOC4wLjA." style="max-width: 600px; max-height: 320px;">
  <h3>Welcome to TuniWork ! To activate your account, please click the button below.</h3>
  <a href="http://localhost:4200/Fverification?token=${token}" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
  <p>Thank you for choosing TuniWork!</p>
</div>`,
    })
    .catch((err) => console.log(err));
};

export const SendPasswordResetEmail = async (
  name: String,
  email: any,
  freelancerId: any
) => {
  // Create a token payload
  const tokenPayload = {
    id: freelancerId,
  };

  // Sign the token with your secret key
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); // Token expires in 24 hours
  // transport houwa jesr from chkoun to amal html body message chnouwa f wostou
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "TuniWork Account Password Reset",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
  <h1>Password Reset</h1>
  <img src="https://img.freepik.com/premium-vector/password-reset-security-icon-line-vector_116137-1332.jpg?w=826" style="max-width: 600px; max-height: 320px;">
  <h3>Click The Button Below To Reset Your Password</h3>
  <p>This Link Will Expire In 1 Hour !</p>
  <a href="http://localhost:4200/PassReset?token=${token}" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
</div>`,
    })
    .catch((err) => console.log(err));
};

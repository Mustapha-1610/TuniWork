import nodemailer from "nodemailer";

const user = "tuniwork40@gmail.com"; // Replace with your email address
const pass = "your_password_here"; // Replace with your email password

// Transporter set up for sending emails
const transport = nodemailer.createTransport({
  service: "Gmail", // You can use the appropriate email service
  auth: {
    user: user,
    pass: pass,
  },
});

// Send a customer an account confirmation mail
export const SendCustomerAccountConfirmationMail = async (
  CustomerName: string,
  CustomerEmail: string, // Assuming email is a string
  customerId: any,
  VerificationCode: string
) => {
  // Use transport to send the email
  await transport
    .sendMail({
      from: user,
      to: CustomerEmail,
      subject: "Customer Account Activation", // Change the subject accordingly
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <h1>TuniWork Customer Account Activation</h1>
        <img src="https://your-image-url-here.com" style="max-width: 600px; max-height: 320px;">
        <h3>Welcome to TuniWork! To activate your account, please click the button below.</h3>
        <a href="" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
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
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "Password Reset",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
  <h1>TuniWork Freelance Account Activation</h1>
  <img src="https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/OIG.png?alt=media&token=d7e717cb-e3a2-4faa-9f4f-27d4bc4cdf6c&_gl=1*1wd4x8o*_ga*MTU1NzQ5MzYxMC4xNjk2NjgwMjU2*_ga_CW55HF8NVT*MTY5NzI5NzQ0Ny44LjEuMTY5NzI5ODgwMS4yOC4wLjA." style="max-width: 600px; max-height: 320px;">
  <h3>Welcome to TuniWork ! To activate your account, please click the button below.</h3>
  <a href="http://localhost:4200/Fverification/${freelancerId}" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
  <p>Thank you for choosing TuniWork!</p>
</div>`,
    })
    .catch((err) => console.log(err));
};

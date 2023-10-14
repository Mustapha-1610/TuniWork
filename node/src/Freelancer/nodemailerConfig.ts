import nodemailer from "nodemailer";
const user = "tuniwork40@gmail.com"; // hedhi t7ot feha l email
const pass = "rluo ouxk anej fkvt";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const SendFreelancerAccountConfirmationMail = async (
  name: String,
  email: any,
  freelancerId: any,
  VerificationCode: String
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  await transport
    .sendMail({
      from: user,
      to: email,
      subject: "Freelancer Account Activation",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
  <h1>TuniWork Freelance Account Activation</h1>
  <img src="https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/2.jfif?alt=media&token=558a71e4-d312-435b-85ba-cfbf7572766c&_gl=1*17tne49*_ga*MTU1NzQ5MzYxMC4xNjk2NjgwMjU2*_ga_CW55HF8NVT*MTY5NzI4NjI4MS43LjEuMTY5NzI4NjMwNC4zNy4wLjA." style="max-width: 600px; max-height: 320px;">
  <h3>Welcome to TuniWork ! To activate your account, please click the button below.</h3>
  <a href="" style="background-color: #E14F76; border: 1px solid #007bff; color: white; padding: 10px 20px; text-decoration: none;">Click Here</a>
  <p>Thank you for choosing TuniWork!</p>
</div>`,
    })
    .catch((err) => console.log(err));
};

import Customer from "./modal"; 
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCustomerAccountConfirmationMail } from "./nodemailerConfig"; 
import { customerRouteProtection } from "./routeProtectionMiddleware";
import generateCustomerToken from "./utils";

export const createCustomerAccount = async (req: express.Request, res: express.Response) => {
  console.log();

  const { Name, Surname, Username, PhoneNumber, ProfilePicture, Email, Password } = req.body;

  try {
    if (!Name || !Surname || !Username || !PhoneNumber || !Email || !Password) { 
      return res.json({ error: "Missing Input(s)" });
    }

    let checkAccountCustomer = await Customer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (checkAccountCustomer) {
      return res.json({ error: "Account Exists" });
    }

    const securePassword = bcrypt.hashSync(Password, 10); 

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode += characters[Math.floor(Math.random() * characters.length)];
    }

    const customer = await Customer.create({ 
      Name,
      Surname,
      Username,
      PhoneNumber,
      Password: securePassword,
      Email,
      VerificationCode: VerificationCode,
    });

    await SendCustomerAccountConfirmationMail(
      customer.Name,
      customer.Email,
      customer._id,
      customer.VerificationCode
    );

    return res.status(201).json({ success: "Account Created" }); 
  } catch (error) {
    return res.status(500).json({ success: "Server Error", error: error.message });
  }
};

export const verifyAccount = async (req: express.Request, res: express.Response) => {
  try {
    const customerId = req.params.customerId;
    const VerificationCode = req.params.VerificationCode;
    const unverifiedCustomer = await Customer.findById(customerId);
    if (!unverifiedCustomer) {
      return res.json({ error: "Account doesn't exist!" });
    }
    if (VerificationCode !== unverifiedCustomer.VerificationCode) {
      return res.json({ error: "Try Again Later!" });
    }
    unverifiedCustomer.AccountActivationStatus = true;
    await unverifiedCustomer.save();
    return res.json({ success: "Account verified, you can now log in!" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

export const auth = async (req: express.Request, res: express.Response) => { 
  try {
    const { Email, Password, PhoneNumber } = req.body;
    let customerAccount;
    if ((!Email && !PhoneNumber) || !Password) {
      return res.status(401).json({ error: "Invalid Input(s)" });
    } else if (!Email) {
      customerAccount = await Customer.findOne({ PhoneNumber });
    } else {
      customerAccount = await Customer.findOne({ Email });
    }
    if (!customerAccount) {
      return res.json({ error: "Account doesn't exist!" });
    }
    const passwordCheck = bcrypt.compareSync(Password, customerAccount.Password);
    if (!passwordCheck) {
      return res.status(404).json({ error: "Invalid email or password!" });
    }
    if (customerAccount.AccountActivationStatus === false) {
      return res.json({
        emailError: "You need to verify your email first before logging in!",
      });
    }
    
    if(customerAccount.AccountVerficiationStatus == false){
      return res.json({ emailError: "This account is disabled!" });
    }


    await generateCustomerToken(res, customerAccount._id); 
    return res.json({ customerAccount });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

export const getProfile = async (req: express.Request, res: express.Response) => {
  try {
    const customer = await customerRouteProtection(req, res);  
    return res.json({ customer: customer, success: "Login Successful" });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt");
    return res.json({ success: "Logout Successful !" }); 
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

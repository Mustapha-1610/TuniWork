import Company from "./modal"
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCompanyAccountConfirmationMail } from "./nodemailerConfig";
import generateCompanyToken from "./utils";
import { companyRouteProtection } from "./routeProtectionMiddleware";

// function to create a comapny account (aziz)

export const create = async (req: express.Request, res: express.Response) => {
  console.log();
  const { ChefName, ChefSurname, ChefEmail, Password, ChefCin,ChefPhone, CompanyName,CompanyWebsite,CompanyEmail, CompanyDescription, CompanyPhone} = req.body;
  try {
    if (!ChefName || !ChefSurname || !ChefEmail || !Password || !ChefCin || !ChefPhone || !CompanyName || !CompanyWebsite || !CompanyEmail || !CompanyDescription || !CompanyPhone ) {
      return res.json({ error: "Missing Input(s)" });
    }

    // ylawej 3la company  3andou nafs l esm (maybe something else)
    let existingCompany = await Company.findOne({
      $or:[{ CompanyName }],
    });

    if (existingCompany) {
      return res.json({ error: "company Exists Allready" });
    }

    // tasna3 password securisé
    const securePassword = bcrypt.hashSync(Password);

    // generating secret code bech nesta3mlouh mba3d fel verficiation mail
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }

    const company = await Company.create({
      ChefName,
      ChefSurname,
      ChefEmail,
      Password: securePassword,
      ChefCin,
      ChefPhone,
      CompanyName,
      CompanyWebsite,
      CompanyEmail,
      CompanyDescription,
      CompanyPhone,
      VerificationCode: VerificationCode,
    });

    await SendCompanyAccountConfirmationMail(
      company.CompanyName,
      company.CompanyEmail,
      company._id,
      company.VerificationCode
    );
    
    return res.json({ success: "Account Created !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};




// function to verify company account (aziz)
export const verifyAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const companyId = req.params.companyId;
    const VerificationCode = req.params.VerificationCode;
    const unverifiedCompany = await Company.findById(companyId);
    if (!unverifiedCompany) {
      return res.json({ error: "Account dosent exist !" });
    }
    if (VerificationCode != unverifiedCompany.VerificationCode) {
      return res.json({ error: "Try Again Later !" });
    }
    unverifiedCompany.AccountVerficiationStatus = true;
    await unverifiedCompany.save();
    return res.json({ sucess: "Account verified you can now log in !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// function to authenticate company  Using jwt's (aziz) to change fazet l phone
export const auth = async (req: express.Request, res: express.Response) => {
  try {
    const { ChefEmail, Password, ChefPhone } = req.body;
    let companyAccount;


    if ((!ChefEmail && !Password) || (!ChefPhone && !Password)) {
      return res.status(401).json({ error: "Invalid Input(s)" });
    } else if (!ChefEmail) {
      companyAccount = await Company.findOne({ ChefPhone });
    } else {
      companyAccount = await Company.findOne({ ChefEmail });
    }


    if (!companyAccount) {
      return res.json({ error: "Account dosent exist !" });
    }
    const passwordcheck = bcrypt.compareSync(
      Password,
      companyAccount.Password
    );
    if (!passwordcheck) {
      return res.status(404).json({ Message: "Invalid email or password !" });
    }
    if (companyAccount.AccountVerficiationStatus === false) {
      return res.json({
        emailError: "You need to verify your email first before logging in !",
      });
    }
    if (companyAccount.AccountActivationStatus === false) {
      return res.json({ error: "This account is disabled !" });
    }


    
    await generateCompanyToken(res, companyAccount._id);
    return res.json({ companyAccount });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

/*
// function to retrieve freelancer Account informations (Mustapha)
export const getProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const Freelancer = await freeLancerRouteProtection(req, res);
    return res.json({ freelancer: Freelancer, success: "Login Successfull" });
  } catch (err) {
    console.log(err);
  }
};

// function to clear the stored jwt and successfuly logs out the freelancer (Mustapha)
export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt");
    return res.json({ success: "Logout Successfull !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
}; */

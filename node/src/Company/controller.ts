import Company from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCompanyAccountConfirmationMail } from "./nodemailerConfig";
import generateCompanyToken from "./utils";
import { companyRouteProtection } from "./routeProtectionMiddleware";

// function to create a comapny account (aziz)

export const create = async (req: express.Request, res: express.Response) => {
  console.log();
  const {
  
    CompanyEmail,
    CompanyName,
    Password,
    CompanyWebsite,
    CompanyLogo,
    CompanyDescription,
    CompanyPhone,
    Location,
    


  } = req.body;
  try {
    if (
      !Password ||
      !CompanyName ||
      !CompanyWebsite ||
      !CompanyEmail ||
      !CompanyDescription ||
      !CompanyPhone ||
      !Location
    ) {
      return res.json({ error: "Missing Input(s)" });
    }

    // ylawej 3la company  3andou nafs l esm (maybe something else)
    let existingCompany = await Company.findOne({
      $or: [{ CompanyName }],
    });

    if (existingCompany) {
      return res.json({ error: "A company by this name already exists." });
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
      Password: securePassword,
      CompanyName,
      CompanyWebsite,
      CompanyEmail,
      CompanyDescription,
      CompanyPhone,
      Location,
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
    const { CompanyEmail, Password, CompanyPhone } = req.body;
    let companyAccount;

    if ((!CompanyEmail && !Password) || (!CompanyPhone && !Password)) {
      return res.status(401).json({ error: "Invalid Input(s)" });
    } else if (!CompanyEmail) {
      companyAccount = await Company.findOne({ CompanyPhone });
    } else {
      companyAccount = await Company.findOne({ CompanyEmail });
    }

    if (!companyAccount) {
      return res.json({ error: "Account dosent exist !" });
    }
    const passwordcheck = bcrypt.compareSync(Password, companyAccount.Password);
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


// function to retrieve company Account informations (aziz)
export const getProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const Company = await companyRouteProtection(req, res);
    return res.json({ company: Company, success: "Login Successfull" });
  } catch (err) {
    console.log(err);
  }
};

// function to clear the stored jwt and successfuly logs out the company (aziz)
export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt");
    return res.json({ success: "Logout Successfull !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

// function to get all companies on the db (aziz)
export const getAllCompanies = async (
  req: express.Request,
  res: express.Response
) => {
  let allcompanies = await Company.find();
  return res.json({ allcompanies });
};

//update (aziz)
export const updateInfo = async (  req: express.Request,  res: express.Response) => {
  try {
    const companyId = await companyRouteProtection(req, res);
    const {
      CompanyName,
      CompanyWebsite,
      CompanyEmail,
      CompanyDescription,
      CompanyPhone,
      Location,


    } = req.body;
    if ("_id" in companyId) {
      let company = await Company.findById(companyId);

      if (!Company) {
        return res.json({ error: "Error" });
      }
      /*if (Company.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled !" });
      }*/

      //ProfilePicture ? (Company.ProfilePicture = ProfilePicture) : null;
      CompanyName ? (company.CompanyName = CompanyName) : null;
      CompanyWebsite ? (company.CompanyWebsite = CompanyWebsite) : null;
      CompanyEmail ? (company.CompanyEmail = CompanyEmail) : null;
      CompanyDescription  ? (company.CompanyDescription = CompanyDescription) : null;
      CompanyPhone ? (company.CompanyPhone = CompanyPhone) : null;
      Location ? (company.Location = Location) : null;

      await company.save();
      return res.json({
        success: "Informations Updated Successfully",
        company,
      });
    }
    return companyId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

//disable acc (aziz)
export const disableAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const companyId = req.body.companyId;
    let company = await Company.findById(companyId);
    if (!company) {
      return res.json({ error: "Error !" });
    }
    company.AccountActivationStatus = false;
    await company.save();
    return res.json({ success: "Account Disabled !" });
  } catch (err) {
    console.log("Server Error !");
  }
};

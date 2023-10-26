import freelancer from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendFreelancerAccountConfirmationMail } from "./nodemailerConfig";
import generateFreelancerToken from "./utils";
import { freeLancerRouteProtection } from "./routeProtectionMiddleware";

// function to create a freelancer account (Mustapha)
export const create = async (req: express.Request, res: express.Response) => {
  const {
    Name,
    Surname,
    PhoneNumber,
    Email,
    Password,
    ProfilePicture,
    HourlyRate,
    PayPerTaskRate,
    Languages,
    EstimateWorkLocation,
    WorkTitle,
    Speciality,
  } = req.body;
  try {
    if (
      !Name ||
      !Surname ||
      !PhoneNumber ||
      !Email ||
      !Password ||
      !HourlyRate ||
      !PayPerTaskRate ||
      !Languages ||
      !EstimateWorkLocation ||
      !WorkTitle ||
      !Speciality
    ) {
      return res.json({ error: "Missing Input(s)" });
    }
    // ylawej 3la freelancer 3andou ya nafs ya nafs phone number ya nafs l mail
    let existingFreelancer = await freelancer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (existingFreelancer) {
      return res.json({ error: "Account Exists Allready" });
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
    let freeLancer: any;
    ProfilePicture
      ? (freeLancer = await freelancer.create({
          Name,
          Surname,
          PhoneNumber,
          Password: securePassword,
          Email,
          VerificationCode: VerificationCode,
          ProfilePicture: ProfilePicture,
          PayRate: {
            HourlyRate: HourlyRate,
            PayPerTaskRate: PayPerTaskRate,
          },
          Languages,
          EstimateWorkLocation,
          WorkTitle,
          Speciality,
        }))
      : (freeLancer = await freelancer.create({
          Name,
          Surname,
          PhoneNumber,
          Password: securePassword,
          Email,
          VerificationCode: VerificationCode,
          PayRate: {
            HourlyRate: HourlyRate,
            PayPerTaskRate: PayPerTaskRate,
          },
          Languages,
          EstimateWorkLocation,
          WorkTitle,
          Speciality,
        }));
    await SendFreelancerAccountConfirmationMail(
      freeLancer.Name,
      freeLancer.Email,
      freeLancer._id,
      freeLancer.VerificationCode
    );
    return res.json({ success: "Account Created !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

// function to verify freelancer account (Muèstapha)
export const verifyAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freeLancerId = req.params.freeLancerId;
    const VerificationCode = req.params.VerificationCode;
    const unverifiedFreeLancer = await freelancer.findById(freeLancerId);
    if (!unverifiedFreeLancer) {
      return res.json({ error: "Account dosent exist !" });
    }
    if (VerificationCode != unverifiedFreeLancer.VerificationCode) {
      return res.json({ error: "Try Again Later !" });
    }
    unverifiedFreeLancer.AccountVerficiationStatus = true;
    await unverifiedFreeLancer.save();
    return res.json({ sucess: "Account verified you can now log in !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// function to authenticate Freelancer Using jwt's (Mustapha)
export const auth = async (req: express.Request, res: express.Response) => {
  try {
    const { Email, Password, PhoneNumber } = req.body;
    let freeLancerAccount;
    if ((!Email && !Password) || (!PhoneNumber && !Password)) {
      return res.status(401).json({ error: "Invalid Input(s)" });
    } else if (!Email) {
      freeLancerAccount = await freelancer.findOne({ PhoneNumber });
    } else {
      freeLancerAccount = await freelancer.findOne({ Email });
    }
    if (!freeLancerAccount) {
      return res.json({ error: "Account dosent exist !" });
    }
    const passwordcheck = bcrypt.compareSync(
      Password,
      freeLancerAccount.Password
    );
    if (!passwordcheck) {
      return res.status(404).json({ Message: "Invalid email or password !" });
    }
    if (freeLancerAccount.AccountVerficiationStatus === false) {
      return res.json({
        emailError: "You need to verify your email first before logging in !",
      });
    }
    if (freeLancerAccount.AccountActivationStatus === false) {
      return res.json({ error: "This account is disabled !" });
    }

    await generateFreelancerToken(res, freeLancerAccount._id);
    return res.json({ freeLancerAccount });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// function to retrieve freelancer Account informations (Mustapha)
export const getProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const Freelancer = await freelancer.findById(freelancerId);
      if (Freelancer.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled !" });
      }
      return res.json({ freelancer: Freelancer });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

// function to clear the stored jwt and successfuly logs out the freelancer (Mustapha)
export const logout = async (req: express.Request, res: express.Response) => {
  try {
    await res.clearCookie("jwt");
    return res.json({ success: "Logout Successfull !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

// function to reset password for the freelancer account
export const passwordReset = async (
  req: express.Request,
  res: express.Response
) => {
  const { newPassword, oldPassword } = req.body;
  const freelancerId = req.params.freelancerId;
  try {
    let freeLancer = await freelancer.findById(freelancerId);
    if (!freeLancer) {
      return res.json({ error: "Error !" });
    }
    const comparePassword = bcrypt.compareSync(
      oldPassword,
      freeLancer.Password
    );
    if (!comparePassword) {
      return res.json({ error: "Password Mismatch !" });
    }
    const hashedPassword = bcrypt.hashSync(newPassword);
    freeLancer.Password = hashedPassword;
    await freeLancer.save();
    return res.json({ success: "Password Changed !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};
// function to get all Freelancers
export const getAllFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  let allfreelancers = await freelancer.find();
  return res.json({ allfreelancers });
};

// function to update freelancer informations
export const updateInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    const {
      Name,
      Surname,
      PhoneNumber,
      ProfilePicture,
      HourlyRate,
      PayPerTaskRate,
      EstimateWorkLocation,
      WorkTitle,
      Speciality,
    } = req.body;
    if ("_id" in freelancerId) {
      let freeLancer = await freelancer.findById(freelancerId);

      if (!freeLancer) {
        return res.json({ error: "Error" });
      }
      if (freeLancer.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled !" });
      }
      Name ? (freeLancer.Name = Name) : null;
      Surname ? (freeLancer.Surname = Surname) : null;
      PhoneNumber ? (freeLancer.PhoneNumber = PhoneNumber) : null;
      ProfilePicture ? (freeLancer.ProfilePicture = ProfilePicture) : null;
      HourlyRate ? (freeLancer.PayRate.HourlyRate = HourlyRate) : null;
      PayPerTaskRate
        ? (freeLancer.PayRate.PayPerTaskRate = PayPerTaskRate)
        : null;
      EstimateWorkLocation
        ? (freeLancer.EstimateWorkLocation = EstimateWorkLocation)
        : null;
      WorkTitle ? (freeLancer.WorkTitle = WorkTitle) : null;
      Speciality ? (freeLancer.Speciality = Speciality) : null;
      await freeLancer.save();
      return res.json({
        success: "Informations Updated Successfully",
        freeLancer,
      });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// function to disable freelancer account
export const disableAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = req.body.freelancerId;
    let freeLancer = await freelancer.findById(freelancerId);
    if (!freeLancer) {
      return res.json({ error: "Error !" });
    }
    freeLancer.AccountActivationStatus = false;
    await freeLancer.save();
    return res.json({ success: "Account Disabled !" });
  } catch (err) {
    console.log("Server Error !");
  }
};

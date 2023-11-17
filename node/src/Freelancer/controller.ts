import freelancer from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendFreelancerAccountConfirmationMail } from "./nodemailerConfig";
import generateFreelancerToken from "./utils";
import { freeLancerRouteProtection } from "./routeProtectionMiddleware";
import { FishOff } from "lucide-angular";
import company from "../Company/modal";
import Freelancer from "../Freelancer/modal";
import generateCompanyToken from "../Company/utils";
import { SendPasswordResetEmail } from "./nodemailerConfig";
import PrivateJobOffer from "../WorkOffer/Company/CompanyPrivateWorkOfferModal";
import PublicJobOffer from "../WorkOffer/Company/CompanyPublicWorkOfferModal";

// function to create a freelancer account (Mustapha)
export const create = async (req: express.Request, res: express.Response) => {
  const { freelancerPersonalInfos, freelancerAddedInfos } = req.body;
  if (!freelancerPersonalInfos.Name) {
    return res.json({ error: "Name is Required !" });
  } else if (!freelancerPersonalInfos.Surname) {
    return res.json({ error: "Surname is Required !" });
  } else if (!freelancerPersonalInfos.PhoneNumber) {
    return res.json({ error: "Phone Number is Required !" });
  } else if (!freelancerPersonalInfos.Email) {
    return res.json({ error: "Email is Required !" });
  } else if (!freelancerPersonalInfos.Password) {
    return res.json({ error: "Password is Required !" });
  } else if (!freelancerPersonalInfos.HourlyRate) {
    return res.json({ error: "Hourly Pay Rate is Required !" });
  } else if (!freelancerPersonalInfos.PayPerTaskRate) {
    return res.json({ error: "Pay Per Task Rate is Required !" });
  } else if (!freelancerAddedInfos.languages) {
    return res.json({ error: "languages are Required !" });
  } else if (!freelancerAddedInfos.workTitle) {
    return res.json({ error: "workTitle is Required !" });
  } else if (!freelancerAddedInfos.speciality) {
    return res.json({ error: "speciality is Required !" });
  }
  try {
    // ylawej 3la freelancer 3andou ya nafs ya nafs phone number ya nafs l mail
    let existingFreelancer = await freelancer.findOne({
      $or: [
        { Email: freelancerPersonalInfos.Email },
        { PhoneNumber: freelancerPersonalInfos.PhoneNumber },
      ],
    });
    if (existingFreelancer) {
      return res.json({ error: "Account Exists Allready" });
    }
    let languagestable: String[] = [];
    freelancerAddedInfos.languages.map((item: any) => {
      languagestable.push(item.item_text);
    });
    let SpecialityArray: String[] = [];
    freelancerAddedInfos.speciality.map((item: any) => {
      SpecialityArray.push(item.item_text);
    });
    // tasna3 password securisé
    const securePassword = bcrypt.hashSync(freelancerPersonalInfos.Password);

    // generating secret code bech nesta3mlouh mba3d fel verficiation mail
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    let freeLancer: any;
    freelancerPersonalInfos.ProfilePicture
      ? (freeLancer = await freelancer.create({
          Name: freelancerPersonalInfos.Name,
          Surname: freelancerPersonalInfos.Surname,
          PhoneNumber: freelancerPersonalInfos.PhoneNumber,
          Password: securePassword,
          Email: freelancerPersonalInfos.Email,
          VerificationCode: VerificationCode,
          ProfilePicture: freelancerPersonalInfos.ProfilePicture,
          PayRate: {
            HourlyRate: freelancerPersonalInfos.HourlyRate,
            PayPerTaskRate: freelancerPersonalInfos.PayPerTaskRate,
          },
          Languages: languagestable,
          EstimateWorkLocation: freelancerPersonalInfos.EstimateWorkLocation,
          WorkTitle: {
            WorkTitleId: freelancerAddedInfos.workTitle[0].item_id,
            WorkTitleText: freelancerAddedInfos.workTitle[0].item_text,
          },
          Speciality: SpecialityArray,
          VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        }))
      : (freeLancer = await freelancer.create({
          Name: freelancerPersonalInfos.Name,
          Surname: freelancerPersonalInfos.Surname,
          PhoneNumber: freelancerPersonalInfos.PhoneNumber,
          Password: securePassword,
          Email: freelancerPersonalInfos.Email,
          VerificationCode: VerificationCode,
          PayRate: {
            HourlyRate: freelancerPersonalInfos.HourlyRate,
            PayPerTaskRate: freelancerPersonalInfos.PayPerTaskRate,
          },
          Languages: languagestable,
          EstimateWorkLocation: freelancerPersonalInfos.EstimateWorkLocation,
          WorkTitle: {
            WorkTitleId: freelancerAddedInfos.workTitle[0].item_id,
            WorkTitleText: freelancerAddedInfos.workTitle[0].item_text,
          },
          Speciality: SpecialityArray,
          VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
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
    const { freeLancerId, VerificationCode } = req.body;
    const unverifiedFreeLancer: any = await freelancer.findById(freeLancerId);
    if (!unverifiedFreeLancer) {
      return res.json({ error: "Account dosent exist !" });
    }
    if (VerificationCode != unverifiedFreeLancer.VerificationCode) {
      return res.json({ error: "Try Again Later !" });
    }
    if (unverifiedFreeLancer.AccountVerficiationStatus === true) {
      return res.json({ error: "Account Allready Verified" });
    }
    if (unverifiedFreeLancer.VerLinkExpDate < new Date()) {
      return res.json({ expireError: "Link Expired" });
    }

    unverifiedFreeLancer.AccountVerficiationStatus = true;
    await unverifiedFreeLancer.save();
    return res.json({ success: "Account verified you can now log in !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

//
export const sendVerificationLink = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freeLancerId, freeLancerMail } = req.body;
    let existingFreelancer: any = await freelancer.findOne({
      $or: [{ Email: freeLancerMail }, { _id: freeLancerId }],
    });
    if (!existingFreelancer) {
      return res.json({ error: "Error try again later" });
    }
    existingFreelancer.VerLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );
    await SendFreelancerAccountConfirmationMail(
      existingFreelancer.Name,
      existingFreelancer.Email,
      existingFreelancer._id,
      existingFreelancer.VerificationCode
    );
    await existingFreelancer.save();
    return res.json({ success: "Verification Link Sent" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const sendPassResetEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerEmail } = req.body;
    let existingFreelancer: any = await freelancer.findOne({
      Email: freelancerEmail,
    });
    if (!existingFreelancer) {
      return res.json({ error: "Account Dosent Exist !" });
    }
    existingFreelancer.PassChangeLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );
    await SendPasswordResetEmail(
      existingFreelancer.Name,
      existingFreelancer.Email,
      existingFreelancer._id
    );
    await existingFreelancer.save();
    return res.json({ success: "Password Reset Mail Sent !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error Try Again Later !" });
  }
};

//
export const passReset = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { jwToken, newPassword, confirmNewPassword } = req.body;
    if (jwToken === null) {
      return res.json({ error: "Error Try Again Later !" });
    } else if (newPassword === null) {
      return res.json({ error: "Missing New Password" });
    } else if (confirmNewPassword === null) {
      return res.json({ error: "Missing Confirm Password" });
    } else if (confirmNewPassword !== newPassword) {
      return res.json({ error: "Password Mismatch" });
    }
    jwt.verify(
      jwToken,
      process.env.JWT_SECRET,
      async (err: any, decoded: any) => {
        if (err) {
          return res.json({ error: "Link Expired" });
        }
        let freeLancerId = decoded.id;
        let exsistingFreelancer: any = await freelancer.findById(freeLancerId);
        if (exsistingFreelancer) {
          const passSimilarityTest = bcrypt.compareSync(
            newPassword,
            exsistingFreelancer.Password
          );
          if (passSimilarityTest) {
            return res.json({ error: "Cant Change To Old Password !" });
          }
          const newHashedPassword = bcrypt.hashSync(newPassword);
          exsistingFreelancer.Password = newHashedPassword;
          await exsistingFreelancer.save();
          return res.json({ success: "Password Changed" });
        } else {
          return res.json({ error: "freelancer dont exist" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error Try Again Later !" });
  }
};

// function to authenticate Freelancer Using jwt's (Mustapha)
export const auth = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body);
    console.log("hello");
    const { Email, Password, PhoneNumber } = req.body;
    let freeLancerAccount: any;
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

//
export const googleAuth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerEmail } = req.body;
    let exisitingFreelancer = await freelancer.findOne({
      Email: freelancerEmail,
    });
    if (!exisitingFreelancer) {
      return res.json({ error: "Account Dont Exist Consider Signing Up" });
    } else {
      return res.json({ freelancerAccount: exisitingFreelancer });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
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
      const Freelancer: any = await freelancer.findById(freelancerId);
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
    res.clearCookie("jwt");
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
    let freeLancer: any = await freelancer.findById(freelancerId);
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
      let freeLancer: any = await freelancer.findById(freelancerId);

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
    let freeLancer: any = await freelancer.findById(freelancerId);
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

export const activateFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId } = req.body;
    let freeLancer: any = await freelancer.findById(freelancerId);
    if (!freeLancer) {
      return res.json({ error: "Account dosent exist !" });
    }
    freeLancer.AccountActivationStatus = true;
    await freeLancer.save();
    return res.json({ success: "Account Activated !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

//
export const multiauth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { Email, Password, PhoneNumber } = req.body;

    let existingAccount: any = await freelancer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (existingAccount) {
      const passwordcheck = bcrypt.compareSync(
        Password,
        existingAccount.Password
      );
      if (!passwordcheck) {
        return res.json({ error: "Invalid email or password !" });
      }
      if (existingAccount.AccountVerficiationStatus === false) {
        return res.json({
          emailError: "You need to verify your email first before logging in !",
        });
      }
      if (existingAccount.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled !" });
      }

      await generateFreelancerToken(res, existingAccount._id);
      return res.json({ freelancerAccount: existingAccount });
    } else if (
      (existingAccount = await company.findOne({
        $or: [{ CompanyEmail: Email }, { CompanyPhone: PhoneNumber }],
      })) !== null
    ) {
      console.log(existingAccount);
      const passwordcheck = bcrypt.compareSync(
        Password,
        existingAccount.Password
      );
      if (!passwordcheck) {
        return res.json({ error: "Invalid email or password !" });
      }
      if (existingAccount.AccountVerficiationStatus === false) {
        return res.json({
          emailError: "You need to verify your email first before logging in !",
        });
      }
      if (existingAccount.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled !" });
      }

      await generateCompanyToken(res, existingAccount._id);
      return res.json({ comapnyAccount: existingAccount });
    } else {
      return res.json({ error: "Account Dosent Exist" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

//accept private job (aziz)
export const acceptPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freeLancerId, jobId } = req.params;

    // Find the private job offer by ID
    const privateJobOffer = await PrivateJobOffer.findById(jobId);

    // Check if the private job offer exists
    if (!privateJobOffer) {
      return res.json({ error: "Private job offer not found" });
    }

    // Update the status to "accepted"
    privateJobOffer.status = "accepted";

    // Save the changes
    await privateJobOffer.save();

    return res.json({ success: "Private job offer accepted" });
  } catch (err) {
    console.error(err);
    return res.json({ error: "Server Error" });
  }
};

//decline private job (aziz)
export const declinePrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extract the necessary information from the request
    const { freeLancerId, jobId } = req.params;

    // Find the private job offer by ID
    const privateJobOffer = await PrivateJobOffer.findById(jobId);

    // Check if the private job offer exists
    if (!privateJobOffer) {
      return res.status(404).json({ error: "Private job offer not found" });
    }

    // Update the status to "declined"
    privateJobOffer.status = "declined";

    await privateJobOffer.save();

    return res.json({ success: "Private job offer declined" });
  } catch (err) {
    console.error(err);
    return res.json({ error: "Server Error" });
  }
};

//apply l public job (aziz)
export const applyForPublicJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId, jobOfferId } = req.body;

    const freelancer = await Freelancer.findById(freelancerId);
    const freelancerName = freelancer.Name;

    const jobOffer = await PublicJobOffer.findById(jobOfferId);

    if (!jobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    // Check if the freelancer has already applied for this job offer
    const existingApplication =
      jobOffer.AppliedFreelancers &&
      jobOffer.AppliedFreelancers.find(
        (application) => String(application.FreelancerId) === freelancerId
      );

    if (existingApplication) {
      return res.json({ error: "You have already applied for this job offer" });
    }

    // Add the job application to the job offer's AppliedFreelancers array
    await PublicJobOffer.findByIdAndUpdate(
      jobOfferId,
      {
        $push: {
          AppliedFreelancers: {
            FreelancerId: freelancerId,
            FreelancerName: freelancerName,
          },
        },
      },
      { new: true }
    );

    //add l application lel tableau pendingPublicJobOffers
    await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $push: {
          pendingWorkOffers: {
            PublicJobOfferId: jobOfferId,
            status: jobOffer.status,
          },
        },
      },
      { new: true }
    );

    // Save the updated job offer
    await jobOffer.save();

    return res.json({ success: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Server Error" });
  }
};

export const savePublicJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId, PWOId, PWOTitle, PWODescription } = req.body;
    if (!freelancerId || !PWOId || !PWOTitle || !PWODescription) {
      return res.json({ error: "Error Try Again Later" });
    }
    const freelancerAccount = await freelancer.findOne({
      _id: freelancerId,
      "SavedWorkOffers.WorkId": PWOId,
    });
    if (freelancerAccount) {
      return res.json({ error: "Offer already saved" });
    }
    const updatedFreelancer = await freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $push: {
          SavedWorkOffers: {
            WorkId: PWOId,
            WorkTitle: PWOTitle,
            WorkDescription: PWODescription,
          },
        },
      },
      { new: true }
    );
    if (updatedFreelancer) {
      return res.json({ success: "Offer Saved" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: " Server Error" });
  }
};

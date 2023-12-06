import freelancer from "./modal";
import customer from "../Customer/modal";
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
import createPDF from "../PDFServices/freelancerContract";
import generateCustomerToken from "../Customer/utils";

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
          EstimateWorkLocation: {
            City: freelancerAddedInfos.cities[0].item_text,
            Municipality: freelancerAddedInfos.municipality[0].item_text,
          },
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
          EstimateWorkLocation: {
            City: freelancerAddedInfos.cities[0].item_text,
            Municipality: freelancerAddedInfos.municipality[0].item_text,
          },
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
    return res.json({
      success: "Account Created !",
      freelancerAccount: freeLancer,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const createMobileAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      City,
      Name,
      Surname,
      Email,
      Password,
      HourlyPayRate,
      PayPerTaskRate,
      WorkTitle,
      Speciality,
      PhoneNumber,
      Municipality,
    } = req.body;
    // ylawej 3la freelancer 3andou ya nafs ya nafs phone number ya nafs l mail
    let existingFreelancer = await freelancer.findOne({
      $or: [{ Email: Email }, { PhoneNumber: PhoneNumber }],
    });
    if (existingFreelancer) {
      return res.json({ error: "Account Exists Allready" });
    }
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    const securePassword = bcrypt.hashSync(Password);
    const freelancerAccount: any = await freelancer.create({
      Name,
      Surname,
      Email,
      Password: securePassword,
      PayRate: {
        HourlyRate: HourlyPayRate,
        PayPerTaskRate: PayPerTaskRate,
      },
      PhoneNumber,
      VerificationCode: VerificationCode,
      Languages: ["Arabic", "English"],
      EstimateWorkLocation: {
        City,
        Municipality,
      },
      WorkTitle: {
        WorkTitleId: null,
        WorkTitleText: WorkTitle,
      },
      Speciality: [Speciality],
      VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    });
    await SendFreelancerAccountConfirmationMail(
      freelancerAccount.Name,
      freelancerAccount.Email,
      freelancerAccount._id,
      freelancerAccount.VerificationCode
    );
    return res.json({ success: "Account Created" });
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
  console.log("AAAAAAAAAAAAA");
  try {
    console.log(req.body);
    const { Email, Password, PhoneNumber } = req.body;
    let freeLancerAccount: any;
    if ((!Email && !Password) || (!PhoneNumber && !Password)) {
      return res.json({ error: "Invalid Input(s)" });
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
      return res.json({ error: "Invalid email or password !" });
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
    console.log(freeLancerAccount);
    return res.json({ freeLancerAccount });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Server Error!" });
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

//
export const updatePP = async (req: express.Request, res: express.Response) => {
  try {
    const { imageUrl } = req.body;
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const freelancerAccount = await freelancer.findByIdAndUpdate(
        freelancerId,
        {
          ProfilePicture: imageUrl,
        },
        { new: true }
      );
      return res.json({ success: "Image Updated", freelancerAccount });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
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
    } else if (
      (existingAccount = await customer.findOne({
        $or: [{ Email: Email }, { PhoneNumber: PhoneNumber }],
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
      await generateCustomerToken(res, existingAccount._id);
      return res.json({ customerAccount: existingAccount });
    } else {
      return res.json({ error: "Account Dosent Exist" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

/******** aziz ******/
//accept private job (aziz)
export const acceptPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { jobId } = req.body;
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      // Find the private job offer by ID
      const privateJobOffer = await PrivateJobOffer.findById(jobId);

      // Check if the private job offer exists
      if (!privateJobOffer) {
        return res.json({ error: "Private job offer not found" });
      }
      console.log(freelancerId);
      const freelancerAccount: any = await freelancer.findByIdAndUpdate(
        freelancerId,
        {
          $push: {
            "WorkHistory.0.Ongoing": {
              TaskTitle: privateJobOffer.Title,
              TaskHolder: privateJobOffer._id,
              DueDate: privateJobOffer.DeadLine,
              TaskDescription: privateJobOffer.Description,
              taskId: privateJobOffer._id,
            },
          },
        },
        { new: true }
      );
      // Update the status to "accepted"
      privateJobOffer.status = "accepted";
      privateJobOffer.WorkingFreelancer.FreelancerName = freelancerAccount.Name;
      privateJobOffer.WorkingFreelancer.FreelancerId = freelancerAccount._id;

      await privateJobOffer.save();
      return res.json({ success: "Private job offer accepted" });
    }
    return freelancerId;
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

    const freelancer: any = await Freelancer.findById(freelancerId);
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
    const freeLancerAccount = await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $push: {
          pendingWorkOffers: {
            PublicJobOfferId: jobOfferId,
            status: jobOffer.status,
            PWOInfos: {
              CName: jobOffer.CompanyName,
              TitlePWO: jobOffer.Title,
              DescriptionPWO: jobOffer.Description,
            },
          },
        },
      },
      { new: true }
    );

    // Save the updated job offer
    await jobOffer.save();

    return res.json({
      success: "Application submitted successfully",
      freeLancerAccount,
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Server Error" });
  }
};

// remove public job application (mustapha)
export const unapplyForPWO = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId, PWOId } = req.body;
    const PWO = await PublicJobOffer.findByIdAndUpdate(
      PWOId,
      {
        $pull: {
          AppliedFreelancers: {
            FreelancerId: freelancerId,
          },
        },
      },
      { new: true }
    );
    const freeLancerAccount = await freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $pull: {
          pendingWorkOffers: {
            PublicJobOfferId: PWOId,
          },
        },
      },
      { new: true }
    );
    return res.json({ success: "Unapplied Successfully", freeLancerAccount });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

// save public job offer (mostfa)
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
      return res.json({
        success: "Offer Saved",
        freeLancerAccount: updatedFreelancer,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: " Server Error" });
  }
};

//unsane private work offer (mostfa)
export const unsavePWO = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId, PWOId } = req.body;
    const freeLancer = await freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $pull: {
          SavedWorkOffers: {
            WorkId: PWOId,
          },
        },
      },
      { new: true }
    );
    return res.json({
      success: "Offre Unsaved",
      freeLancerAccount: freeLancer,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const sendFreelancerContract = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicWorkOfferId, freelancerId } = req.params;
    const PublicWorkOffer: any = await PublicJobOffer.findById(
      publicWorkOfferId
    );

    let data: any;

    data = {
      CompanyInfos: {
        CompanyName: PublicWorkOffer.CompanyName,
        CompanyId: PublicWorkOffer.CompanyId,
        CompanySignature: PublicWorkOffer.CompanySignature,
      },
      FreelancerInfos: {
        FreelancerName: PublicWorkOffer.WorkingFreelancer.FreelancerName,
        FreelancerId: PublicWorkOffer.WorkingFreelancer.FreelancerId,
      },
      WorkInfos: {
        WorkTitle: PublicWorkOffer.Title,
        WorkDescription: PublicWorkOffer.Description,
        PaymentMethod: PublicWorkOffer.PaymentMethod.PayPerHours
          ? PublicWorkOffer.PaymentMethod.PayPerHours
          : PublicWorkOffer.PaymentMethod.PayPerTask,
      },
    };

    const url = await createPDF(data);
    const contractingCompany: any = await company.findById(
      PublicWorkOffer.CompanyId
    );

    // Fetch the contractedFreelancer using the provided ID
    const acceptedFreelancer: any = await freelancer.findById(freelancerId);

    // Update the arrays
    acceptedFreelancer.CompanyRecievedContracts.push({
      ContractUrl: url,
      ContrantName:
        "Private Work Offer Contract From " +
        contractingCompany.CompanyName +
        " Company",
      CreationDate: new Date(),
      workOfferId: {
        PublicWO: publicWorkOfferId,
      },
      workOfferInformations: {
        TaskTile: PublicWorkOffer.Title,
        TaskDescription: PublicWorkOffer.Description,
        TaskHolder: contractingCompany._id,
        taskId: PublicWorkOffer._id,
      },
    });
    contractingCompany.freelancerSentContracts.push(url);

    // Save the changes
    await acceptedFreelancer.save();
    await contractingCompany.save();

    return res.json({ success: "Contract Created", Link: url });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const filterPWOSearch = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { workSpeciality, City } = req.body;
    if (workSpeciality && City) {
      const returnedFields =
        "PaymentMethod _id Title CreationDate CompanyName PaymentMethodVerificationStatus Location TotalWorkOfferd TotalMoneyPayed Description WorkSpeciality";
      const matchingJobOffers: any = await PublicJobOffer.find({
        WorkSpeciality: {
          $in: workSpeciality,
        },
        "WorkLocation.City": City,
      }).select(returnedFields);
      return res.json({ matchingJobOffers });
    } else if (workSpeciality && !City) {
      const returnedFields =
        "PaymentMethod _id Title CreationDate CompanyName PaymentMethodVerificationStatus Location TotalWorkOfferd TotalMoneyPayed Description WorkSpeciality";
      const matchingJobOffers: any = await PublicJobOffer.find({
        WorkSpeciality: {
          $in: workSpeciality,
        },
      }).select(returnedFields);
      return res.json({ matchingJobOffers });
    } else if (!workSpeciality && City) {
      console.log("HELLOOOOOOOOO");
      const freelancerId = await freeLancerRouteProtection(req, res);
      if ("_id" in freelancerId) {
        const freeLancer: any = await freelancer.findById(freelancerId);
        console.log("hello");
        const returnedFields =
          "PaymentMethod _id Title CreationDate CompanyName PaymentMethodVerificationStatus Location TotalWorkOfferd TotalMoneyPayed Description WorkSpeciality";
        const matchingJobOffers: any = await PublicJobOffer.find({
          WorkSpeciality: {
            $in: freeLancer.Speciality,
          },
          "WorkLocation.City": City,
        }).select(returnedFields);
        return res.json({ matchingJobOffers });
      }

      return res.json({ freelancerId });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const addDate = async (req: express.Request, res: express.Response) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    const { date } = req.body;

    if ("_id" in freelancerId) {
      const frelancerAccount: any = await freelancer.findById(freelancerId);
      if (frelancerAccount) {
        frelancerAccount.Schedule.push(date);
        await frelancerAccount.save();
        return res.json({ success: "Date Added" });
      }
      return res.json({ success: "error" });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const getDate = async (req: express.Request, res: express.Response) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const freelancerAccount: any = await freelancer.findById(freelancerId);
      return res.json({ schedule: freelancerAccount.Schedule });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const refreshProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const freelancerAccount: any = await freelancer.findById(freelancerId);
      return res.json({ freelancerAccount });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const cleanNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const freelancerAccount: any = await freelancer.findById(freelancerId);
      freelancerAccount.Notifications.forEach((notification: any) => {
        if (!notification.readStatus) {
          notification.readStatus = true;
        }
      });
      await freelancerAccount.save();
      return res.json({ success: "Notifications Updated" });
    }

    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const updatePWOTaskProgression = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { PWOId, IdsArray } = req.body;
    let PWO: any = await PrivateJobOffer.findById(PWOId);
    IdsArray.map((item: any) => {
      PWO.TaskTable.map((task: any) => {
        if (item.toString() === task._id.toString()) {
          task.TaskDoneStatus = !task.TaskDoneStatus;
        }
      });
    });
    await PWO.save();
    return res.json({ success: "Marked Successfully", PWO });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const sendPaymentRequest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const { workId } = req.body;
      const PWO = await PrivateJobOffer.findById(workId);
      const test = PWO.TaskTable.map((item) => {
        if (item.TaskDoneStatus === false) {
          return false;
        }
      });
      console.log(test);
      if (test.includes(false)) {
        return res.json({ error: "Access Denied Tasks Are Not Finiched" });
      }
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const acceptWorkContract = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { contractId } = req.body;
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const freelancerAccount: any = await freelancer.findById(freelancerId);
      let PWO: Boolean;
      const updatedContracts = freelancerAccount.CompanyRecievedContracts.map(
        (contract: any) => {
          if (contract._id.equals(contractId)) {
            freelancerAccount.WorkHistory[0].Ongoing.push({
              TaskTitle: contract.workOfferInformations.TaskTitle,
              TaskDescription: contract.workOfferInformations.TaskDescription,
              TaskHolder: contract.workOfferInformations.TaskHolder,
              taskId: contract.workOfferInformations.taskId,
            });
            return {
              ...contract.toObject(),
              acceptanceState: true,
              ResponseState: true,
            };
          }
          return contract.toObject();
        }
      );
      freelancerAccount.CompanyRecievedContracts = updatedContracts;

      await freelancerAccount.save();
      return res.json({ freelancerAccount });
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "ERROR" });
  }
};

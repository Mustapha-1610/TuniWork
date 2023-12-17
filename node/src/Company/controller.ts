import Company from "./modal";
import Freelancer from "../Freelancer/modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCompanyAccountConfirmationMail } from "./nodemailerConfig";
import generateCompanyToken from "./utils";
import { companyRouteProtection } from "./routeProtectionMiddleware";
import PublicJobOffer from "../WorkOffer/Company/CompanyPublicWorkOfferModal";
import paymentRequest from "../utils/PaymentRequest/modal";
import { FishOff } from "lucide-angular";
import company from "../Company/modal";
// import { SendPasswordResetEmail } from "./nodemailerConfig";
import PrivateJobOffer from "../WorkOffer/Company/CompanyPrivateWorkOfferModal";
import createPDF from "../PDFServices/freelancerContract";
import freelancer from "../Freelancer/modal";
import { freelancerNameSpace } from "../server";

// function to create a comapny account (aziz)

export const create = async (req: express.Request, res: express.Response) => {
  const { companyPersonalInfos, companyAddedInfos } = req.body;

  if (!companyPersonalInfos.CompanyName) {
    return res.json({ error: "CompanyName is Required !" });
  } else if (!companyPersonalInfos.CompanyEmail) {
    return res.json({ error: "CompanyEmail is Required !" });
  } else if (!companyPersonalInfos.CompanyPhone) {
    return res.json({ error: "CompanyPhone  is Required !" });
  } else if (!companyPersonalInfos.Password) {
    return res.json({ error: "Password is Required !" });
  } else if (!companyPersonalInfos.CompanyWebsite) {
    return res.json({ error: "CompanyWebsite is Required !" });
  } else if (!companyPersonalInfos.Location) {
    return res.json({ error: "Location is Required !" });
  } else if (!companyPersonalInfos.CompanyDescription) {
    return res.json({ error: "CompanyDescription is Required !" });
  } else if (!companyAddedInfos.languages) {
    return res.json({ error: "languages are Required !" });
  } else if (!companyAddedInfos.workTitle) {
    return res.json({ error: "workTitle is Required !" });
  }

  try {
    // ylawej 3la company 3andha  ya nafs ya nafs phone number ya nafs l mail
    let existingCompany = await Company.findOne({
      $or: [
        { CompanyEmail: companyPersonalInfos.CompanyEmail },
        { CompanyPhone: companyPersonalInfos.CompanyPhone },
      ],
    });
    if (existingCompany) {
      return res.json({ error: "Account Exists Allready" });
    }
    let languagestable: String[] = [];
    companyAddedInfos.languages.map((item: any) => {
      languagestable.push(item.item_text);
    });

    // tasna3 password securisé
    const securePassword = bcrypt.hashSync(companyPersonalInfos.Password);

    // generating secret code bech nesta3mlouh mba3d fel AccountVerificationStatus mail
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    let company: any;

    companyPersonalInfos.ProfilePicture
      ? (company = await Company.create({
          CompanyName: companyPersonalInfos.CompanyName,
          CompanyEmail: companyPersonalInfos.CompanyEmail,
          CompanyPhone: companyPersonalInfos.CompanyPhone,
          Password: securePassword,
          Location: companyPersonalInfos.Location,
          CompanyDescription: companyPersonalInfos.CompanyDescription,
          CompanyWebsite: companyPersonalInfos.CompanyWebsite,
          CompanySignature: companyPersonalInfos.CompanySignature, // Add this line

          VerificationCode: VerificationCode,
          ProfilePicture: companyPersonalInfos.ProfilePicture,

          Languages: languagestable,
          EstimateWorkLocation: {
            City: companyAddedInfos.cities[0].item_text,
            Municipality: companyAddedInfos.municipality[0].item_text,
          },
          WorkTitle: {
            WorkTitleId: companyAddedInfos.workTitle[0].item_id,
            WorkTitleText: companyAddedInfos.workTitle[0].item_text,
          },
          VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        }))
      : (company = await Company.create({
          CompanyName: companyPersonalInfos.CompanyName,
          CompanyEmail: companyPersonalInfos.CompanyEmail,
          CompanyPhone: companyPersonalInfos.CompanyPhone,
          Password: securePassword,
          Location: companyPersonalInfos.Location,
          CompanyDescription: companyPersonalInfos.CompanyDescription,
          CompanyWebsite: companyPersonalInfos.CompanyWebsite,

          CompanySignature: companyPersonalInfos.CompanySignature, // Add this line

          VerificationCode: VerificationCode,
          Languages: languagestable,

          EstimateWorkLocation: {
            City: companyAddedInfos.cities[0].item_text,
            Municipality: companyAddedInfos.municipality[0].item_text,
          },

          WorkTitle: {
            WorkTitleId: companyAddedInfos.workTitle[0].item_id,
            WorkTitleText: companyAddedInfos.workTitle[0].item_text,
          },
          VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        }));

    await SendCompanyAccountConfirmationMail(
      company.CompanyName,
      company.CompanyEmail,
      company._id,
      company.VerificationCode
    );
    return res.json({
      success: "Account Created !",
      companyAccount: company,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

// function to verify freelancer account (aziz)

//
export const sendVerificationLink = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId, mail } = req.body;
    let existingCompany: any = await company.findOne({
      $or: [{ CompanyEmail: mail }, { _id: companyId }],
    });
    if (!existingCompany) {
      return res.json({ error: "Error try again later" });
    }
    existingCompany.VerLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );
    await SendCompanyAccountConfirmationMail(
      existingCompany.CompanyName,
      existingCompany.CompanyEmail,
      existingCompany._id,
      existingCompany.VerificationCode
    );
    await existingCompany.save();
    return res.json({ success: "Verification Link Sent" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
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
    if (companyAccount.AccountVerificationStatus === false) {
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

//update company details (aziz)
export const updateInfo = async (
  req: express.Request,
  res: express.Response
) => {
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
      CompanyDescription
        ? (company.CompanyDescription = CompanyDescription)
        : null;
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
    const { companyId } = req.params;
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

//re enable acc (aziz)
export const activateCompany = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId } = req.params;
    let company: any = await Company.findById(companyId);
    if (!company) {
      return res.json({ error: "Account dosent exist !" });
    }
    company.AccountActivationStatus = true;
    await company.save();
    return res.json({ success: "Account Activated !" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

//get all freelancers
export const getAllFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  let allfreelancers = await Freelancer.find();
  return res.json({ allfreelancers });
};

//save freelancer (aziz)
export const saveFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId, freelancerId } = req.params;

    // Check if the company and freelancer exist
    const company = await Company.findById(companyId);
    const freelancer: any = await Freelancer.findById(freelancerId);
    const freelancerName = freelancer ? freelancer.Name : null;

    if (!company || !freelancer) {
      return res.json({ error: "Invalid company or freelancer ID" });
    }

    // Check if the freelancer is already saved by the company
    const existingSavedFreelancer = company.savedFreelancers.find(
      (saved) => saved.freelancerId.toString() === freelancerId
    );

    if (existingSavedFreelancer) {
      return res.json({ error: "Freelancer already saved by the company" });
    }

    await Company.findByIdAndUpdate(
      companyId,
      {
        $push: {
          savedFreelancers: {
            freelancerId: freelancerId,
            freelancerName: freelancerName,
          },
        },
      },
      { new: true }
    );

    // Save the updated company document
    await company.save();

    return res.json({ success: "Freelancer saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

//unsave freelancer (aziz)
export const unsaveFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId, freelancerId } = req.params;

    // Check if the company exists
    const company = await Company.findById(companyId);

    if (!company) {
      return res.json({ error: "Invalid company ID" });
    }

    // Check if the freelancer is saved by the company
    const existingSavedFreelancerIndex = company.savedFreelancers.findIndex(
      (saved) => saved.freelancerId.toString() === freelancerId
    );

    if (existingSavedFreelancerIndex === -1) {
      return res.json({ error: "Freelancer not saved by the company" });
    }

    // Remove the freelancer from the savedFreelancers array
    company.savedFreelancers.splice(existingSavedFreelancerIndex, 1);

    // Save the updated company document
    await company.save();

    return res.json({ success: "Freelancer removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getSavedFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId } = req.params;

    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Extract saved freelancers from the company document
    const savedFreelancers = company.savedFreelancers;

    return res.json({ savedFreelancers });
  } catch (error) {
    console.error("Error in getSavedFreelancers:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

//view details of a freelancer
export const viewFreelancerDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId } = req.params;

    // Find the freelancer by ID
    const freelancer = await Freelancer.findById(freelancerId);

    if (!freelancer) {
      return res.status(404).json({ error: "Freelancer not found" });
    }

    // Send the freelancer details in the response
    return res.json({ freelancer });
  } catch (error) {
    console.error("Error in getFreelancerDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export function verifyAccount(arg0: string, verifyAccount: any) {
  throw new Error("Function not implemented.");
}

// (Mustapha)
export const acceptPaymentRequest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { workId } = req.body;
    let work: any = await PublicJobOffer.findById(workId);
    if (work) {
      work.PaymentRequest.PaymentStatus = "Payment Sent";
      work.status = "done";
      let payingCompany = await company.findById(work.CompanyId);
      const companyindex = payingCompany.PaymentRequests.findIndex(
        (paymentInfos: any) => {
          return (
            work.PaymentRequest.PaymentRequestId ===
              paymentInfos.PaymentRequestId ||
            work.PaymentRequest.PaymentRequestId.equals(
              paymentInfos.PaymentRequestId
            )
          );
        }
      );
      console.log(companyindex);
      if (companyindex !== -1) {
        payingCompany.PaymentRequests[companyindex].PaymentStatus =
          "Payment Sent";
      }
      let payedFreelancer: any = await freelancer.findById(
        work.WorkingFreelancer.FreelancerId
      );
      const freelancerIndex = payedFreelancer.PaymentRequests.findIndex(
        (paymentInfos: any) => {
          return (
            work.PaymentRequest.PaymentRequestId ===
              paymentInfos.PaymentRequestId ||
            work.PaymentRequest.PaymentRequestId.equals(
              paymentInfos.PaymentRequestId
            )
          );
        }
      );
      console.log(freelancerIndex + "AAAAAAAAAAAA");
      if (freelancerIndex !== -1) {
        payedFreelancer.PaymentRequests[freelancerIndex].PaymentStatus =
          "Payment Sent";
      }
      payedFreelancer.Earnings =
        payedFreelancer.Earnings + work.PaymentRequest.PaymentAmount;
      payingCompany.PaymentRequests;
      await paymentRequest.findByIdAndUpdate(
        work.PaymentRequest.PaymentRequestId,
        {
          PaymentStatus: "Payment Sent",
        },
        {
          new: true,
        }
      );
      payedFreelancer.WorkHistory.Ongoing =
        payedFreelancer.WorkHistory.Ongoing.filter((item: any) => {
          return item.taskId.toString() !== work._id.toString();
        });

      payedFreelancer.WorkHistory.Finiched.push({
        TaskTitle: work.Title,
        TaskHolder: work.CompanyId,
        EarningsMade: work.PaymentRequest.PaymentAmount,
        taskId: work._id,
      });
      payedFreelancer.Notifications.push({
        NotificationMessage:
          "Recieved Payment Of " +
          work.PaymentRequest.PaymentAmount +
          "$ from " +
          work.CompanyName +
          " Company",
        senderInformations: {
          senderId: work.CompanyId,
          senderUserType: "Company",
          creationDate: new Date(),
          context: "Payment",
        },
      });
      await payedFreelancer.save();
      await payingCompany.save();
      await work.save();
      freelancerNameSpace.emit("NotificationRefresh", {
        freelancerId: payedFreelancer._id.toString(),
      });
      return res.json({ success: "Payment Sent" });
    } else {
      work = await PrivateJobOffer.findById(workId);
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

// (Mustapha)
export const declinePaymenyRequest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { workId } = req.body;
    let work: any = await PublicJobOffer.findById(workId);
    if (work) {
      work.PaymentRequest.PaymentStatus = "Payment Declined";
      work.status = "Declined";
      let payingCompany = await company.findById(work.CompanyId);
      const companyindex = payingCompany.PaymentRequests.findIndex(
        (paymentInfos: any) => {
          return (
            work.PaymentRequest.PaymentRequestId ===
              paymentInfos.PaymentRequestId ||
            work.PaymentRequest.PaymentRequestId.equals(
              paymentInfos.PaymentRequestId
            )
          );
        }
      );
      if (companyindex) {
        console.log(companyindex);
        payingCompany.PaymentRequests[companyindex].PaymentStatus =
          "Payment Declined";
      }
      let payedFreelancer: any = await freelancer.findById(
        work.WorkingFreelancer.FreelancerId
      );
      const freelancerIndex = payedFreelancer.PaymentRequests.findIndex(
        (paymentInfos: any) => {
          work.PaymentRequest.PaymentRequestId ===
            paymentInfos.PaymentRequests ||
            work.PaymentRequest.PaymentRequestId.equals(
              paymentInfos.PaymentRequests
            );
        }
      );
      if (freelancerIndex) {
        payedFreelancer.PaymentRequests[companyindex].PaymentStatus =
          "Payment Declined";
      }
      await paymentRequest.findByIdAndUpdate(
        work.PaymentRequest.PaymentRequestId,
        {
          PaymentStatus: "Payment Declined",
        },
        {
          new: true,
        }
      );
      payedFreelancer.Notifications.push({
        NotificationMessage:
          "Payment Request Of " +
          work.Title +
          " Has Been Declined By " +
          work.CompanyName +
          " Company. In Case Of Misagreement You Can Submit A Report To The Administration",
        senderInformations: {
          senderId: work.CompanyId,
          senderUserType: "Company",
          creationDate: new Date(),
          context: "Payment",
        },
      });
      await payedFreelancer.save();
      await payingCompany.save();
      await work.save();
      freelancerNameSpace.emit("NotificationRefresh", {
        freelancerId: payedFreelancer._id.toString(),
      });
      return res.json({ success: "Payment Declined" });
    } else {
      work = await PrivateJobOffer.findById(workId);
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

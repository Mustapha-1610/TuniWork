import express from "express";
import freelancer from "../../Freelancer/modal";
import PrivateJobOffer from "../../WorkOffer/Company/CompanyPrivateWorkOfferModal";
import PublicJobOffer from "../../WorkOffer/Company/CompanyPublicWorkOfferModal";
import adminPaymentReport from "./modal";
import company from "../../Company/modal";
import paymentRequest from "../PaymentRequest/modal";
import { freelancerNameSpace } from "../../server";
export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { workId, Title, Description } = req.body;
    let workData: any = await PublicJobOffer.findById(workId);
    if (workData) {
      const adminReport = await adminPaymentReport.create({
        Title,
        Description,
        PaymentRequestId: workData.PaymentRequest.PaymentRequestId,
        FreelancerInfos: {
          freelancerName: workData.WorkingFreelancer.FreelancerName,
          freelancerId: workData.WorkingFreelancer.FreelancerId,
        },
        companyInfos: {
          companyName: workData.CompanyName,
          companyId: workData.CompanyId,
        },
        WorkOfferId: workData._id,
      });
    }
    let payingCompany = await company.findById(workData.CompanyId);
    const companyindex = payingCompany.PaymentRequests.findIndex(
      (paymentInfos: any) => {
        return (
          workData.PaymentRequest.PaymentRequestId ===
            paymentInfos.PaymentRequestId ||
          workData.PaymentRequest.PaymentRequestId.equals(
            paymentInfos.PaymentRequestId
          )
        );
      }
    );
    if (companyindex) {
      console.log(companyindex);
      payingCompany.PaymentRequests[companyindex].PaymentStatus =
        "Reported , Awaiting Admin Review";
    }
    let payedFreelancer: any = await freelancer.findById(
      workData.WorkingFreelancer.FreelancerId
    );
    const freelancerIndex = payedFreelancer.PaymentRequests.findIndex(
      (paymentInfos: any) => {
        workData.PaymentRequest.PaymentRequestId ===
          paymentInfos.PaymentRequests ||
          workData.PaymentRequest.PaymentRequestId.equals(
            paymentInfos.PaymentRequests
          );
      }
    );
    if (freelancerIndex) {
      payedFreelancer.PaymentRequests[companyindex].PaymentStatus =
        "Reported , Awaiting Admin Review";
    }
    await paymentRequest.findByIdAndUpdate(
      workData.PaymentRequest.PaymentRequestId,
      {
        PaymentStatus: "Reported , Awaiting Admin Review",
      },
      {
        new: true,
      }
    );
    workData.PaymentRequest.PaymentStatus = "Reported , Awaiting Admin Review";
    payedFreelancer.Notifications.push({
      NotificationMessage:
        "Payment Request Of " +
        workData.Title +
        " Has Been Reported Successfully , Report Will Now Undergo Admin Review",
      senderInformations: {
        senderId: workData.CompanyId,
        senderUserType: "Company",
        creationDate: new Date(),
        context: "Payment",
      },
    });
    await payedFreelancer.save();
    await payingCompany.save();
    await workData.save();
    freelancerNameSpace.emit("NotificationRefresh", {
      freelancerId: payedFreelancer._id.toString(),
    });
    return res.json({ success: "Report Submitted", workData });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

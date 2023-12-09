import { freeLancerRouteProtection } from "../../Freelancer/routeProtectionMiddleware";
import freelancer from "../../Freelancer/modal";
import company from "../../Company/modal";
import paymentRequest from "./modal";
import express from "express";
import PrivateJobOffer from "../../WorkOffer/Company/CompanyPrivateWorkOfferModal";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { workId, payPerTask, payperHours } = req.body;
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const workInfos: any = await PrivateJobOffer.findById(workId);
      if (workInfos) {
        const payRequest = await paymentRequest.create({
          companyInfos: {
            companyName: workInfos.companyName,
            companyId: workInfos.CompanyId,
          },
          freelancerInfos: {
            freelancerId: workInfos.WorkingFreelancer.FreelancerId,
            freelancerName: workInfos.WorkingFreelancer.FreelancerName,
          },
          PayInformations: {
            PayPerTask: payPerTask ? payPerTask : null,
            PayPerHours: payperHours ? payperHours : null,
          },
          PWODetails: {
            Private: true,
            Id: workInfos._id,
          },
        });
        await company.findByIdAndUpdate(workInfos.companyId, {
          $push: {
            PaymentRequests: {
              PaymentRequestId: payRequest._id,
              FreelancerName: workInfos.WorkingFreelancer.FreelancerName,
            },
          },
        });
        return res.json({ success: "Created", payRequest });
      } else {
        const publicPwo: any = await PrivateJobOffer.findById(workInfos);
        const payRequest = await paymentRequest.create({
          companyInfos: {
            companyName: publicPwo.companyName,
            companyId: publicPwo.CompanyId,
          },
          freelancerInfos: {
            freelancerId: publicPwo.WorkingFreelancer.FreelancerId,
            freelancerName: publicPwo.WorkingFreelancer.FreelancerName,
          },
          PayInformations: {
            PayPerTask: payPerTask ? payPerTask : null,
            PayPerHours: payperHours ? payperHours : null,
          },
          PWODetails: {
            Private: true,
            Id: publicPwo._id,
          },
        });
        await company.findByIdAndUpdate(publicPwo.companyId, {
          $push: {
            PaymentRequests: {
              PaymentRequestId: payRequest._id,
              FreelancerName: publicPwo.WorkingFreelancer.FreelancerName,
            },
          },
        });
        return res.json({ success: "Created", payRequest });
      }
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

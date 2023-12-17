import { freeLancerRouteProtection } from "../../Freelancer/routeProtectionMiddleware";
import freelancer from "../../Freelancer/modal";
import company from "../../Company/modal";
import paymentRequest from "./modal";
import express from "express";
import PrivateJobOffer from "../../WorkOffer/Company/CompanyPrivateWorkOfferModal";
import PublicJobOffer from "../../WorkOffer/Company/CompanyPublicWorkOfferModal";
import { Turtle } from "lucide-angular/src/icons";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { workId, attachements } = req.body;
    const freelancerId = await freeLancerRouteProtection(req, res);
    if ("_id" in freelancerId) {
      const workInfos: any = await PrivateJobOffer.findById(workId);
      if (workInfos) {
        let paymentAmount: any = null;
        let tasksTable: any = null;
        if (workInfos.PaymentMethod.PayPerTask) {
          paymentAmount = workInfos.PaymentMethod.PayPerTask.FixedPrice;
          tasksTable = workInfos.TaskTable;
        }
        const payRequest = await paymentRequest.create({
          companyInfos: {
            companyName: workInfos.companyName,
            companyId: workInfos.CompanyId,
          },
          freelancerInfos: {
            freelancerId: workInfos.WorkingFreelancer.FreelancerId,
            freelancerName: workInfos.WorkingFreelancer.FreelancerName,
          },
          PWODetails: {
            Private: true,
            _id: workInfos._id,
          },
          PayInformations: {
            Totalpay: paymentAmount,
            TasksDone: tasksTable,
          },
          attachements,
        });
        await payRequest.save();
        await freelancer.findByIdAndUpdate(
          freelancerId,
          {
            $push: {
              PaymentRequests: {
                PaymentRequestId: payRequest._id,
                FreelancerName: workInfos.WorkingFreelancer.FreelancerName,
                CompanyName: workInfos.companyName,
                PaymentAmount: paymentAmount,
                TaskTitle: workInfos.Title,
                workOfferId: workId,
              },
            },
          },
          {
            new: true,
          }
        );
        await company.findByIdAndUpdate(
          workInfos.companyId,
          {
            $push: {
              PaymentRequests: {
                PaymentRequestId: payRequest._id,
                FreelancerName: workInfos.WorkingFreelancer.FreelancerName,
                CompanyName: workInfos.companyName,
                PaymentAmount: paymentAmount,
                TaskTitle: workInfos.Title,
                workOfferId: workId,
              },
            },
          },
          {
            new: true,
          }
        );
        workInfos.PaymentRequest = {
          PaymentRequestId: "657da7307bbc8459451a33f8",
          PaymentAmount: paymentAmount,
          PaymentStatus: "Awaiting Company Response",
        };
        await workInfos.save();
        return res.json({
          success: "Created",
          payRequest,
          workData: workInfos,
        });
      } else {
        const publicPwo: any = await PublicJobOffer.findById(workId);
        let paymentAmount: any = null;
        let tasksTable: any = null;
        if (publicPwo.PaymentMethod.PayPerTask) {
          paymentAmount = publicPwo.PaymentMethod.PayPerTask.FixedPrice;
          tasksTable = publicPwo.TaskTable;
        }
        const payRequest = await paymentRequest.create({
          companyInfos: {
            companyName: publicPwo.CompanyName,
            companyId: publicPwo.CompanyId,
          },
          freelancerInfos: {
            freelancerId: publicPwo.WorkingFreelancer.FreelancerId,
            freelancerName: publicPwo.WorkingFreelancer.FreelancerName,
          },
          PWODetails: {
            Public: true,
            _id: publicPwo._id,
          },
          PayInformations: {
            Totalpay: paymentAmount,
            TasksDone: tasksTable,
          },
          attachements,
        });
        await freelancer.findByIdAndUpdate(
          freelancerId,
          {
            $push: {
              PaymentRequests: {
                PaymentRequestId: payRequest._id,
                FreelancerName: publicPwo.WorkingFreelancer.FreelancerName,
                CompanyName: publicPwo.companyName,
                PaymentAmount: paymentAmount,
                TaskTitle: publicPwo.Title,
                workOfferId: workId,
              },
            },
          },
          {
            new: true,
          }
        );
        await company.findByIdAndUpdate(
          publicPwo.CompanyId,
          {
            $push: {
              PaymentRequests: {
                PaymentRequestId: payRequest._id,
                FreelancerName: publicPwo.WorkingFreelancer.FreelancerName,
                CompanyName: publicPwo.companyName,
                workOfferId: workId,
                PaymentAmount: paymentAmount,
                TaskTitle: publicPwo.Title,
              },
            },
          },
          {
            new: true,
          }
        );
        publicPwo.PaymentRequest = {
          PaymentRequestId: payRequest._id,
          PaymentAmount: paymentAmount,
          PaymentStatus: "Awaiting Company Response",
        };
        await publicPwo.save();
        return res.json({ success: "Created", payRequest });
      }
    }
    return freelancerId;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

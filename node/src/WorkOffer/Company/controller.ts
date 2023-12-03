import express from "express";
import company from "../../Company/modal";
import companyPublicWorkOffer from "./CompanyPublicWorkOfferModal";
import PrivateJobOffer from "./CompanyPrivateWorkOfferModal";
import Freelancer from "../../Freelancer/modal";
import PublicJobOffer from "./CompanyPublicWorkOfferModal";

/********************PUBLIC JOBS PART ******************/
// create public job offer ( mostfa)
export const createPublicJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicJobData, cityData } = req.body;

    const offeringCompany = await company.findById(publicJobData.CompanyId);
    if (!offeringCompany) {
      console.log("test");
      return res.json({ error: "Server Error" });
    }
    let SpecialityArray: String[] = [];
    cityData.specialities.map((item: any) => {
      SpecialityArray.push(item.item_text);
    });
    const PaymentMethodVerificationStatus =
      offeringCompany.PaymentMethodVerificationStatus;
    const CompanyName = offeringCompany.CompanyName;
    const CompanyLocation = offeringCompany.Location;
    const TotalWorkOfferd = offeringCompany.WorkOfferd;
    const TotalMoneyPayed = offeringCompany.MoneySpent;

    await companyPublicWorkOffer.create({
      Title: publicJobData.Title,
      WorkTitle: cityData.workTitles[0].item_text,
      Description: publicJobData.Description,
      Note: publicJobData.Note,
      PaymentMethod: {
        PayPerTask: publicJobData.PayPerTask,
        PayPerHour: publicJobData.PayPerHour,
      },
      WorkSpeciality: SpecialityArray,
      CompanyId: publicJobData.CompanyId,
      PaymentMethodVerificationStatus,
      CompanyName,
      CompanyLocation,
      TotalMoneyPayed,
      TotalWorkOfferd,
      WorkLocation: {
        City: cityData.cities[0].item_text,
        Municipality: cityData.municipality[0].item_text,
      },
    });
    return res.json({ success: "work offer created" });
  } catch (err) {
    console.log("test1");
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

// (mostfa)
export const FindBestMatchesPublicWorkOffers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId } = req.body;
    const freeLancer: any = await Freelancer.findById(freelancerId);
    const returnedFields =
      "PaymentMethod _id Title CreationDate CompanyName PaymentMethodVerificationStatus Location TotalWorkOfferd TotalMoneyPayed Description WorkSpeciality";
    const matchingJobOffers: any = await companyPublicWorkOffer
      .find({
        WorkSpeciality: {
          $in: freeLancer.Speciality,
        },
      })
      .select(returnedFields);
    return res.json({ matchingJobOffers });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//get applied freelancers(aziz)
export const getAppliedFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicJobOfferId } = req.params;

    // Find the public job offer by ID
    const publicJobOffer = await PublicJobOffer.findById(publicJobOfferId);

    if (!publicJobOffer) {
      return res.status(404).json({ error: "Public job offer not found." });
    }

    // Get the applied freelancers
    const appliedFreelancers = publicJobOffer.AppliedFreelancers;

    return res.json({ appliedFreelancers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!" });
  }
};

// view details of public job (aziz)
export const getPublicJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicJobOfferId } = req.params;

    // Find the public job offer by ID
    const publicJobOffer = await PublicJobOffer.findById(publicJobOfferId);

    if (!publicJobOffer) {
      return res.status(404).json({ error: "Public job offer not found." });
    }

    // Return the details of the public job offer
    return res.json({ publicJobOffer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!" });
  }
};

//idk ver 2
export const getPublicJobDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicJobOfferId } = req.params;

    // Fetch the details of the public job offer based on the ID
    const publicJobOffer = await PublicJobOffer.findById(publicJobOfferId);

    if (!publicJobOffer) {
      return res.json({ error: "Public job offer not found" });
    }

    // Return the details of the public job offer
    return res.json({ publicJobOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//cancel public job offer (aziz)
export const cancelPublicJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { freelancerId, PublicJobOfferId } = req.params; // Change from req.body to req.params

    // Find the private job offer by ID
    const jobOffer = await PublicJobOffer.findById(PublicJobOfferId);

    if (!jobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    //matejemech tcaancelleha ela ki tebda fi pending status
    if (jobOffer.status !== "awaiting application requests") {
      return res.json({
        error: "Cannot cancel the job offer at its current status",
      });
    }

    // ne7i l job mn tableau freelancer ProposedPrivateWorks
    await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $pull: {
          pendingWorkOffers: {
            PublicJobOfferId: PublicJobOfferId,
          },
        },
      },
      { new: true }
    );

    // fase5 mel bdd
    await PublicJobOffer.findByIdAndDelete(PublicJobOfferId);

    return res.json({ success: "public Job offer canceled successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

//edit public job offer (aziz)
export const editPublicJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      Title,
      WorkTitle,
      Description,
      Note,
      PayPerTask,
      PayPerHour,
      WorkSpeciality,
    } = req.body;

    const updatedJobOffer = await PublicJobOffer.findByIdAndUpdate(
      req.params.PublicJobOfferId,
      {
        Title,
        Description,
        Note,
        "PaymentMethod.PayPerTask": PayPerTask,
        "PaymentMethod.PayPerHour": PayPerHour,
        WorkTitle,
        WorkSpeciality,
      },
      { new: true } // Return the updated document
    );

    if (!updatedJobOffer) {
      return res.json({ error: "public Job offer not found" });
    }

    return res.json({ success: "public  job offer updated", updatedJobOffer });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

//accept freelancer and reject the rest freelancers (aziz)
export const acceptFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicJobOfferId, freelancerId } = req.params;

    // Find the public job offer by ID
    const publicJobOffer = await PublicJobOffer.findById(publicJobOfferId);

    if (!publicJobOffer) {
      return res.status(404).json({ error: "Public job offer not found." });
    }

    // Check if the public job offer is in the correct status to accept a freelancer
    if (publicJobOffer.status !== "awaiting application requests") {
      return res
        .status(400)
        .json({ error: "This job offer is not open for applications." });
    }

    // Check if the freelancer has applied
    const appliedFreelancer = publicJobOffer.AppliedFreelancers.find(
      (freelancer) => freelancer.FreelancerId.toString() === freelancerId
    );

    if (!appliedFreelancer) {
      return res
        .status(404)
        .json({ error: "Freelancer not found among the applicants." });
    }

    // If the freelancer is accepted, mark them as accepted
    if (appliedFreelancer.Status === "pending") {
      // Update the status of the accepted freelancer in AppliedFreelancers
      appliedFreelancer.Status = "accepted";

      // Update the public job offer status
      publicJobOffer.status = "freelancer accepted, awaiting contract";

      // Save changes to the database
      await publicJobOffer.save();

      // Update the status of the accepted freelancer to "accepted" in pendingWorkOffers
      await Freelancer.updateOne(
        {
          _id: freelancerId,
          "pendingWorkOffers.PublicJobOfferId": publicJobOfferId,
        },
        { $set: { "pendingWorkOffers.$.Status": "accepted" } }
      );

      // Update the status of other freelancers to "rejected" in pendingWorkOffers
      await Freelancer.updateMany(
        {
          _id: { $ne: freelancerId },
          "pendingWorkOffers.PublicJobOfferId": publicJobOfferId,
        },
        { $set: { "pendingWorkOffers.$.Status": "rejected" } }
      );

      // Update the status of other freelancers to "rejected" in AppliedFreelancers
      await PublicJobOffer.updateMany(
        { _id: publicJobOfferId, "AppliedFreelancers.Status": "pending" },
        { $set: { "AppliedFreelancers.$[elem].Status": "rejected" } },
        { arrayFilters: [{ "elem.Status": "pending" }] }
      );

      return res.json({
        success: "Freelancer accepted successfully.",
        acceptedFreelancer: appliedFreelancer,
        updatedJobOfferStatus: publicJobOffer.status,
      });
    } else {
      return res.json({
        error: "Freelancer has already been accepted or rejected.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error!" });
  }
};

// function to get all private job offers of a company (aziz)
export const getAllPublicJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId } = req.params;

    // Fetch private job offers based on the company ID
    const publicJobOffers = await PublicJobOffer.find({ CompanyId: companyId });

    res.json(publicJobOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// get all public work offer (aziz)
export const getPublicWorkOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { publicWorkOfferId } = req.body;
    const PWO = await companyPublicWorkOffer.findById(publicWorkOfferId);
    if (!PWO) {
      return res.json({ error: "Work Offer Dont Exist Anymore" });
    }
    const offeringCompany = await company.findById(PWO.CompanyId.toString());
    PWO.PaymentMethodVerificationStatus =
      offeringCompany.PaymentMethodVerificationStatus;
    PWO.TotalWorkOfferd = offeringCompany.WorkOfferd;
    PWO.TotalMoneyPayed = offeringCompany.MoneySpent;
    await PWO.save();
    return res.json({ PWO });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

/*************************PRIVATE JOB OFFERS ******************/

// create private job offer ( aziz )
export const createPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      Title,
      Description,
      Note,
      PayPerTask,
      PayPerHour,
      CompanyId,
      PaymentMethodVerificationStatus,
      CompanyName,
      CompanyLocation,
      TotalWorkOfferd,
      TotalMoneyPayed,
      FreelancerId,
      DeadLine,
    } = req.body;

    const offeringCompany = await company.findById(CompanyId);
    if (!offeringCompany) {
      return res.json({ error: "Server Error" });
    }

    // Fetch the freelancer's name based on FreelancerId
    const freelancer: any = await Freelancer.findById(FreelancerId);
    const freelancerName = freelancer ? freelancer.Name : null;

    let workOffer = await PrivateJobOffer.create({
      Title,
      Description,
      Note,
      PaymentMethod: {
        PayPerTask,
        PayPerHour,
      },
      CompanyId,
      PaymentMethodVerificationStatus,
      CompanyName,
      CompanyLocation,
      TotalMoneyPayed,
      TotalWorkOfferd,
      DeadLine,

      WorkingFreelancer: {
        FreelancerName: freelancerName, // Use the fetched freelancer name
        FreelancerId,
      },
    });

    // Update freelancer's ProposedPrivateWorks array
    await Freelancer.findByIdAndUpdate(
      FreelancerId,
      {
        $push: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: workOffer._id,
          },
          Notifications: {
            NotificationMessage:
              "New Work Offer Recieved from " +
              offeringCompany.CompanyName +
              " Company",
            senderInformations: {
              senderId: offeringCompany._id,
              senderUserType: "Company",
            },
          },
        },
      },
      { new: true }
    );

    return res.json({
      success: "private work offer created",
      jobOfferId: workOffer._id,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// edit private job offer ( aziz )
export const editPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      Title,
      Description,
      Note,
      PayPerTask,
      PayPerHour,
      CompanyName,
      CompanyLocation,
      TotalWorkOfferd,
      TotalMoneyPayed,
    } = req.body;
    const updatedJobOffer = await PrivateJobOffer.findByIdAndUpdate(
      req.params.PrivateJobOfferId,
      {
        Title,
        Description,
        Note,
        "PaymentMethod.PayPerTask": PayPerTask,
        "PaymentMethod.PayPerHour": PayPerHour,
        CompanyName,
        CompanyLocation,
        TotalWorkOfferd,
        TotalMoneyPayed,
      },
      { new: true } // Return the updated document
    );

    if (!updatedJobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    return res.json({ success: "Private job offer updated", updatedJobOffer });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

export const cancelJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // const { freelancerId, PrivateJobOfferId } = req.params;

    const { PrivateJobOfferId } = req.params; // Change from req.body to req.params

    // Find the private job offer by ID
    const jobOffer = await PrivateJobOffer.findById(PrivateJobOfferId);

    if (!jobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    //matejemech tcaancelleha ela ki tebda fi pending status
    if (jobOffer.status !== "awaiting freelancer response") {
      return res.json({
        error: "Cannot cancel the job offer at its current status",
      });
    }

    // ne7i l job mn tableau freelancer ProposedPrivateWorks
    /*    await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $pull: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: PrivateJobOfferId,
          },
        },
      },
      { new: true }
    ); */

    // fase5 mel bdd
    await PrivateJobOffer.findByIdAndDelete(PrivateJobOfferId);

    return res.json({ success: "Job offer canceled successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};

// get both private and public job offers from the databse(aziz)
export const getAllJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const companyId = req.params.companyId;

    // Assuming that your job offer models have a CompanyId field
    const privateJobs = await PrivateJobOffer.find({ CompanyId: companyId });
    const publicJobs = await companyPublicWorkOffer.find({
      CompanyId: companyId,
    });

    const allJobs = [...privateJobs, ...publicJobs];

    res.json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// function to get all private job offers of a company (aziz)
export const getAllPrivateJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { companyId } = req.params;

    // Fetch private job offers based on the company ID
    const privateJobOffers = await PrivateJobOffer.find({
      CompanyId: companyId,
    });

    res.json(privateJobOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//get details of a prv job offer (aziz)
export const getPrivateJobOfferDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { privateJobOfferId } = req.params;

    // Fetch private job offer details based on the privateJobOfferId
    const privateJobOfferDetails = await PrivateJobOffer.findById(
      privateJobOfferId
    );

    res.json(privateJobOfferDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

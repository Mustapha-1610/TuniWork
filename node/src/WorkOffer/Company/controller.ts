import express from "express";
import company from "../../Company/modal";
import companyPublicWorkOffer from "./CompanyPublicWorkOfferModal";
import PrivateJobOffer from "./CompanyPrivateWorkOfferModal"
import Freelancer from "../../Freelancer/modal"




// create public job offer ( mostfa)
export const createPublicJob = async (req: express.Request, res: express.Response) => {
  try {
    const {
      Title,
      WorkTitle,
      Description,
      Note,
      PayPerTask,
      PayPerHour,
      WorkSpeciality,
      CompanyId,
    } = req.body;
    const offeringCompany = await company.findById(CompanyId);
    if (!offeringCompany) {
      return res.json({ error: "Server Error" });
    }
    const PaymentMethodVerificationStatus = offeringCompany.PaymentMethodVerificationStatus;
    const CompanyName = offeringCompany.CompanyName;
    const CompanyLocation = offeringCompany.Location;
    const TotalWorkOfferd = offeringCompany.WorkOfferd;
    const TotalMoneyPayed = offeringCompany.MoneySpent;
    let workOffer = await companyPublicWorkOffer.create({
      Title,
      WorkTitle,
      Description,
      Note,
      PaymentMethod: {
        PayPerTask,
        PayPerHour,
      },
      WorkSpeciality,
      CompanyId,
      PaymentMethodVerificationStatus,
      CompanyName,
      CompanyLocation,
      TotalMoneyPayed,
      TotalWorkOfferd,
    });
    return res.json({ success: "work offer created" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};


//mostfa kamel l functions teb3in l pub job offer BEFORE my private job work






















// create private job offer ( aziz )
export const createPrivateJob = async (req: express.Request, res: express.Response) => {
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
    const freelancer = await Freelancer.findById(FreelancerId);
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
        },
      },
      { new: true }
    );

    return res.json({ success: "private work offer created" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};







// edit private job offer ( aziz )

export const editPrivateJob = async (req: express.Request, res: express.Response) => {
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
        'PaymentMethod.PayPerTask': PayPerTask,
        'PaymentMethod.PayPerHour': PayPerHour,
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




export const cancelJobOffer = async (req: express.Request, res: express.Response) => {
  try {
    const { freelancerId, PrivateJobOfferId } = req.params; // Change from req.body to req.params

    // Find the private job offer by ID
    const jobOffer = await PrivateJobOffer.findById(PrivateJobOfferId);

    if (!jobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    //matejemech tcaancelleha ela ki tebda fi pending status 
    if (jobOffer.status !== "awaiting freelancer response") {
      return res.json({ error: "Cannot cancel the job offer at its current status" });
    }

    // ne7i l job mn tableau freelancer ProposedPrivateWorks
    await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $pull: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: PrivateJobOfferId,
          },
        },
      },
      { new: true }
    );

    // fase5 mel bdd
    await PrivateJobOffer.findByIdAndDelete(PrivateJobOfferId);

    return res.json({ success: "Job offer canceled successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};











// get both private and publicj ob offers from the databse 
export const getAllJobOffers = async (req: express.Request, res: express.Response) => {
  try {
    const privateJobs = await PrivateJobOffer.find();
    const publicJobs = await companyPublicWorkOffer.find();

    const allJobs = [...privateJobs, ...publicJobs];

    res.json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};








// function to get all companies on the db (aziz)
export const getAllPrivateJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  let allprvjobs = await PrivateJobOffer.find();
  return res.json({ allprvjobs });
};




//

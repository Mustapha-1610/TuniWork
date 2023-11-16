import express from "express";
import comapany from "../../Company/modal";
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
    const offeringCompany = await comapany.findById(CompanyId);
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
      FreelancerId, // bch yjih fel array
    } = req.body;

    const offeringCompany = await comapany.findById(CompanyId);

    if (!offeringCompany) {
      return res.json({ error: "Server Error" });
    }


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

      WorkingFreelancer: {
        // FreelancerName, // Set the freelancer's name if available
        FreelancerId, // Assign the FreelancerId from the request body
      },
    });

    // lenna bch thot l job fel array ta3 l freelancer
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
    return res.json({ error: "Server Error !" });
  }
};






// edit private job offer ( aziz )

export const editPrivateJob = async (req: express.Request, res: express.Response) => {
  
 /* This code block is responsible for editing a private job offer. It receives the updated job offer
 details from the request body, including the job offer ID, title, description, note, payment per
 task, payment per hour, company name, company location, total work offered, and total money paid. */
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










// function to get all companies on the db (aziz)
export const getAllPrivateJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  let allprvjobs = await PrivateJobOffer.find();
  return res.json({ allprvjobs });
};




//

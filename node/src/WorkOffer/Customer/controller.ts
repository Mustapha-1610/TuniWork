import express from "express";
import customer from "../../Customer/modal";
import customerPublicWorkOffer from "./CustomerPublicWorkOfferModal";
import PrivateJobOffer from "./CustomerPrivateWorkOfferModal";
import Freelancer from "../../Freelancer/modal";



//
/*export const createPublicJob = async (req: express.Request, res: express.Response) => {
  try {
  
    const {
      Title,            
      WorkTitle, 
     Description,     
      Note, 
      PayPerTask,       
      PayPerHour,       
      WorkSpeciality,
       CustomerId,      
      CustomerName    } = req.body;

    
    const offeringCustomer = await customer.findById(CustomerId);

    
    if (!offeringCustomer) {
  
      return res.status(404).json({ error: "Customer not found" });
    }

    const PaymentMethodVerificationStatus = offeringCustomer.get("PaymentMethodVerificationStatus") as boolean;
    const Username = offeringCustomer.get("Username") as string;
    const location = offeringCustomer.get("location") as string;
    const WorkOfferd = offeringCustomer.get("WorkOfferd") as number;
    const MoneySpent = offeringCustomer.get("MoneySpent") as number;

   
    let workOffer = await customerPublicWorkOffer.create({
      Title,
      WorkTitle,
      Description,
      Note,
      PaymentMethod: {
        PayPerTask,
        PayPerHour,
      },
      WorkSpeciality,
      PaymentMethodVerificationStatus,
      CustomerName,
      CustomerId,
      location,
      Username,
      WorkOfferd,
      MoneySpent,
    });

  
    return res.json({ success: "Work offer created" });
  } catch (err) {
  
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};*/



export const createPrivateJob = async (req: express.Request, res: express.Response) => {
  try {
    const {
      Title,  
      Description, 
      Note,  
      PayPerTask,  
      PayPerHour, 
      CustomerId,  
      PaymentMethodVerificationStatus,  
      CustomerName,  
      CustomerLocation,  
      TotalWorkOfferd, 
      TotalMoneyPayed,  
      FreelancerId,  
      DeadLine, 
    } = req.body;

    
    const offeringCustomer = await customer.findById(CustomerId);

   
    if (!offeringCustomer) {
      return res.json({ error: "Customer not found" });
    }

    
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
      CustomerId,
      PaymentMethodVerificationStatus,
      CustomerName,
      CustomerLocation,
      TotalMoneyPayed,
      TotalWorkOfferd,
      DeadLine,

      WorkingFreelancer: {
        FreelancerName: freelancerName,
        FreelancerId,
      },
    });

    
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




export const editPrivateJob = async (req: express.Request, res: express.Response) => {
  try {
      const {
          Title,
          Description,
          Note,
          PayPerTask,
          PayPerHour,
          CustomerName,
          CustomerLocation,
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
              CustomerName,
              CustomerLocation,
              TotalWorkOfferd,
              TotalMoneyPayed,
          },
          { new: true } 
      );

      if (!updatedJobOffer) {
          return res.json({ error: "Job offer not found" });
      }

      return res.json({ success: "Private job offer updated", updatedJobOffer });
  } catch (err) {
      console.log(err);
      return res.json({ error: "Server Error!" });
  }
};






export const getAllPrivateJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  let AllPJobs = await PrivateJobOffer.find();
  return res.json({ AllPJobs });
};


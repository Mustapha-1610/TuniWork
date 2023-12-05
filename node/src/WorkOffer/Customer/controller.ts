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
};

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
};*/

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
        "PaymentMethod.PayPerTask": PayPerTask,
        "PaymentMethod.PayPerHour": PayPerHour,
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




export const createPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { privateJobOfferData, taskTable } = req.body;
    const offeringCustomer = await customer.findById( // Change from company to customer
      privateJobOfferData.CustomerId // Change from CompanyId to CustomerId
    );
    if (!offeringCustomer) {
      return res.json({ error: "Server Error" });
    }

    // Fetch the freelancer's name based on FreelancerId
    const freelancer: any = await Freelancer.findById(
      privateJobOfferData.FreelancerId
    );
    const freelancerName = freelancer ? freelancer.Name : null;
    let workOffer: any = await PrivateJobOffer.create({
      Title: privateJobOfferData.Title,
      Description: privateJobOfferData.Description,
      Note: privateJobOfferData.Note,
      PaymentMethod: {
        PayPerTask: privateJobOfferData.PayPerTask,
        PayPerHour: privateJobOfferData.PayPerHour,
      },
      CustomerId: privateJobOfferData.CustomerId, // Change from CompanyId to CustomerId
      PaymentMethodVerificationStatus:
        privateJobOfferData.PaymentMethodVerificationStatus,
      CustomerName: privateJobOfferData.CustomerName, // Change from CompanyName to CustomerName
      CustomerLocation: privateJobOfferData.CustomerLocation, // Change from CompanyLocation to CustomerLocation
      TotalMoneyPayed: privateJobOfferData.TotalMoneyPayed,
      TotalWorkOffered: privateJobOfferData.TotalWorkOffered, // Change from TotalWorkOfferd to TotalWorkOffered
      DeadLine: privateJobOfferData.DeadLine,

      WorkingFreelancer: {
        FreelancerName: freelancerName, // Use the fetched freelancer name
        FreelancerId: privateJobOfferData.FreelancerId,
      },
      TaskTable: [],
    });
    taskTable.map((item: any) => {
      workOffer.TaskTable.push({
        TaskTitle: item,
      });
    });
    await workOffer.save();
    const FreelancerId = privateJobOfferData.FreelancerId;
    // Update freelancer's ProposedPrivateWorks array
    await Freelancer.findByIdAndUpdate(
      FreelancerId,
      {
        $push: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: workOffer._id,
            Title: privateJobOfferData.Title,
            Description: privateJobOfferData.Description,
          },
          Notifications: {
            NotificationMessage:
              "New Work Offer Recieved from " +
              offeringCustomer.Name + 
              " Customer",
            senderInformations: {
              senderId: offeringCustomer._id, 
              senderUserType: "Customer", 
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




export const deletePrivateJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { privateJobOfferId } = req.params;

    // Delete private job offer based on the privateJobOfferId
    await PrivateJobOffer.findByIdAndDelete(privateJobOfferId);

    res.json({ success: "Private job offer deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


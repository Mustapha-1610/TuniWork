import express from "express";
import customer from "../../Customer/modal";

import PrivateJobOffer from "./CustomerPrivateWorkOfferModal";
import Freelancer from "../../Freelancer/modal";
import PrivateCJobOffer from "./CustomerPrivateWorkOfferModal";

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
  try {
    const { customerId } = req.params;

   
    const privateCJobOffers = await  PrivateCJobOffer.find({
      CustomerId: customerId,
    });

    res.json(privateCJobOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};




export const createPrivateJob = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { privateJobOfferData, taskTable } = req.body;




   const offeringCustomer = await customer.findById(
   privateJobOfferData.CustomerId 
    );


    if (!offeringCustomer) {
      return res.json({ error: "Server Error" });
    }

  
    const freelancer: any = await Freelancer.findById(
      privateJobOfferData.FreelancerId
    );
    const freelancerName = freelancer ? freelancer.Name : null;

    let workOffer: any = await PrivateJobOffer.create({
      Title: privateJobOfferData.Title,
      Description: privateJobOfferData.Description,
      Note: privateJobOfferData.Note,
      PayRate: {
        PayPerHour: privateJobOfferData.PayPerHour,
        PayPerTask: privateJobOfferData.PayPerTask,
        
      },
      CustomerId: privateJobOfferData.CustomerId, 
      PaymentMethodVerificationStatus:
        privateJobOfferData.PaymentMethodVerificationStatus,
      CustomerName: privateJobOfferData.CustomerName, 
      CustomerLocation: privateJobOfferData.CustomerLocation, 
      TotalMoneyPayed: privateJobOfferData.TotalMoneyPayed,
      TotalWorkOffered: privateJobOfferData.TotalWorkOffered,
      DeadLine: privateJobOfferData.DeadLine,

      WorkingFreelancer: {
        FreelancerName: freelancerName, 
        FreelancerId: privateJobOfferData.FreelancerId,
      },
      TaskTable: [],
      StartTime: privateJobOfferData.StartTime,
    });
    taskTable.map((item: any) => {
      workOffer.TaskTable.push({
        TaskTitle: item,
      });
    });
    await workOffer.save();
    const FreelancerId = privateJobOfferData.FreelancerId;
  
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
              creationDate: new Date(),
              context: "PrivateWorkOffer",
              objectId: workOffer._id,
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
    return res.json({  error: err.message || "Server Error!" });
  }
};



export const getPrivateJobOfferDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { privateJobOfferId } = req.params;


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




export const cancelJobOffer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
   

    const { PrivateJobOfferId } = req.params; 
  
    const jobOffer = await PrivateJobOffer.findById(PrivateJobOfferId);

    if (!jobOffer) {
      return res.json({ error: "Job offer not found" });
    }

    
    if (jobOffer.status !== "awaiting freelancer response") {
      return res.json({
        error: "Cannot cancel the job offer at its current status",
      });
    }

    await PrivateJobOffer.findByIdAndDelete(PrivateJobOfferId);

    return res.json({ success: "Job offer canceled successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};





export const createPrivateJobCustomerMobile = async ( req: express.Request, res: express.Response) => {
  try {
    const { CustomerId, FreelancerId, Title, Description, FixedPrice,  Note, CustomerName, StartTime, DeadLine} = req.body;
    const offeringCustomer = await customer.findById(CustomerId);

    if (!offeringCustomer) {
      return res.json({ error: "Server Error" });
    }
    const PaymentMethodVerificationStatus = offeringCustomer.PaymentMethodVerificationStatus;
    const CompanyLocation = offeringCustomer.Location;
    const TotalWorkOfferd = offeringCustomer.WorkOfferd;
    const TotalMoneyPayed = offeringCustomer.MoneySpent;
   

    const freelancer: any = await Freelancer.findById(FreelancerId);
    const freelancerName = freelancer ? freelancer.Name : null;
    
let workOffer = await PrivateJobOffer.create({
  Title,
  Description,
  Note,
  CustomerId: CustomerId,
  FixedPrice,

  Name: CustomerName,
  CompanyLocation: CompanyLocation,
  DeadLine: DeadLine,
  WorkingFreelancer: {
    FreelancerName: freelancerName,
    FreelancerId: FreelancerId,
  },
  StartTime: StartTime,
});

   
    await workOffer.save();


   
   
    await Freelancer.findByIdAndUpdate( FreelancerId,
      {
        $push: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: workOffer._id,
            Title: Title,
            Description: Description,
          },
          Notifications: {
            NotificationMessage:
              "New Private Work Offer Recieved from " +
              offeringCustomer.Name +
              " Customer",
            senderInformations: {
              senderId: offeringCustomer._id,
              senderUserType: "Customer",
              creationDate: new Date(),
              context: "PrivateWorkOffer",
              objectId: workOffer._id,
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
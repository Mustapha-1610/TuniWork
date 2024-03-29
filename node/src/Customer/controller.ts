import Customer from "./modal";
import jwt from "jsonwebtoken";
import express, { query } from "express";
import bcrypt from "bcryptjs";
import { SendCustomerAccountConfirmationMail } from "./nodemailerConfig";import { customerRouteProtection } from "./routeProtectionMiddleware";
import generateCustomerToken from "./utils";
import generateFreelancerToken from "Freelancer/utils";
import generateCompanyToken from "Company/utils";
import freelancer from "../Freelancer/modal";
import { freelancerNameSpace } from "../server";
import Freelancer from "../Freelancer/modal";






export const createCustomerAccount = async (req: express.Request, res: express.Response) => {
  console.log('Request Body:', req.body);
  const {customerPersonalInfos } = req.body;

  
    if (!customerPersonalInfos.Name) {
      return res.json({ error: "Name is Required !" });
    }
     else if (!customerPersonalInfos.PhoneNumber) {
      return res.json({ error: "PhoneNumber is Required !" });
    } 
    else if (!customerPersonalInfos.LastName) {
      return res.json({ error: "LastName  is Required !" });
    } 
    else if (!customerPersonalInfos.Email) {
      return res.json({ error: "Email is Required !" });
    } 
    else if (!customerPersonalInfos.Password) {
      return res.json({ error: "Password is Required !" });
    } 
    else if (!customerPersonalInfos.Location) {
      return res.json({ error: "Location is Required !" });
    } 
   

    try{
      let existingCustomer = await Customer.findOne({
        $or: [
          { Email: customerPersonalInfos.Email },
          { PhoneNumber: customerPersonalInfos.PhoneNumber },
        ],
      });

      if (existingCustomer) {
        return res.json({ error: "Account Exists Allready" });
      }
     

      const securePassword = bcrypt.hashSync(customerPersonalInfos.Password);



      const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }


    let customer: any;

    customerPersonalInfos.ProfilePicture ? (customer = await Customer.create({
        Name: customerPersonalInfos.Name,
        LastName: customerPersonalInfos.LastName,
        Email: customerPersonalInfos.Email,
        PhoneNumber: customerPersonalInfos.PhoneNumber,
        Password: securePassword,
        Location: customerPersonalInfos.Location,
        
       

        VerificationCode: VerificationCode,
        ProfilePicture: customerPersonalInfos.ProfilePicture,

          EstimateWorkLocation: {
            City: customerPersonalInfos.cities && customerPersonalInfos.cities.length > 0
            ? customerPersonalInfos.cities[0].item_text
            : 'VilleParDéfaut',
            Municipality: customerPersonalInfos.municipality && customerPersonalInfos.municipality.length > 0
            ? customerPersonalInfos.municipality[0].item_text
            : 'MunicipalitéParDéfaut',
          },
          VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        })) : (customer = await Customer.create({
        Name: customerPersonalInfos.Name,
        Email: customerPersonalInfos.Email,
        PhoneNumber: customerPersonalInfos.PhoneNumber,
        Password: securePassword,
        Location: customerPersonalInfos.Location,
       

      
        VerificationCode: VerificationCode,
       
        EstimateWorkLocation: {
        City: customerPersonalInfos.cities[0].item_text,
        Municipality: customerPersonalInfos.municipality[0].item_text,
        },
        VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        }));

        await SendCustomerAccountConfirmationMail(
          customer.Name,
          customer.Email,
          customer._id,
          customer.VerificationCode
        );

        return res.json({
          success: "Account Created !",
          customerAccount: Customer,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
    
  };

  export const auth = async (req: express.Request, res: express.Response) => {
    try {
      const { Email, Password } = req.body;
      let customerAccount;
  
      if (!Email && !Password) {
        return res.status(401).json({ error: "Invalid Input(s)" });
     
      } else {
        customerAccount = await Customer.findOne({ Email });
      }
  
      if (!customerAccount) {
        return res.json({ error: "Account doesn't exist!" });
      }
  
      const passwordCheck = bcrypt.compareSync(Password, customerAccount.Password);
      if (!passwordCheck) {
        return res.status(404).json({ Message: "Invalid email or password!" });
      }
  
      if (customerAccount.AccountVerficiationStatus === false) {
        return res.json({
          emailError: "You need to verify your email first before logging in!",
        });
      }
  
      if (customerAccount.AccountActivationStatus === false) {
        return res.json({ error: "This account is disabled!" });
      }
  
      await generateCustomerToken(res, customerAccount._id);
      return res.json({ customerAccount });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Server Error!" });
    }
  };
  


  
  export const verifyAccount = async (req: express.Request, res: express.Response) => {
    try {
      const { customerId, VerificationCode } = req.body;
      const unverifiedCustomer = await Customer.findById(customerId);
      console.log('Found Customer:', unverifiedCustomer);
      
      if (!unverifiedCustomer) {
        return res.json({ error: "Account doesn't exist!" });
      }
  
      if (VerificationCode !== unverifiedCustomer.VerificationCode) {
        return res.json({ error: "Try Again Later!" });
      }
  
      if (unverifiedCustomer.AccountVerficiationStatus === true) {
        return res.json({ error: "Account Already Verified" });
      }
  
      unverifiedCustomer.AccountVerficiationStatus = true;
      await unverifiedCustomer.save();
  
      return res.json({ success: "Account verified, you can now log in!" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Server Error!" });
    }
  };


export const authC = async (req: express.Request, res: express.Response) => { 
  try {
    
    const { Email, Password, PhoneNumber } = req.body;
    let customerAccount;

    
    if ((!Email && !PhoneNumber) || !Password) {
      return res.status(401).json({ error: "Entrée invalide" });
    } else if (!Email) {
    
      customerAccount = await Customer.findOne({ PhoneNumber });
    } else {
     
      customerAccount = await Customer.findOne({ Email });
    }

   
    if (!customerAccount) {
      return res.json({ error: "Le compte n'existe pas!" });
    }

    
    const passwordCheck = bcrypt.compareSync(Password, customerAccount.Password);
    if (!passwordCheck) {
      return res.status(404).json({ error: "Email ou mot de passe invalide!" });
    }

   
    if (customerAccount.AccountActivationStatus === false) {
      return res.json({
        emailError: "Vous devez d'abord vérifier votre adresse e-mail avant de vous connecter!",
      });
    }
    
   
    if(customerAccount.AccountVerficiationStatus == true){
      return res.json({ emailError: "Ce compte a été désactivé!" });
    }

    
    await generateCustomerToken(res, customerAccount._id); 
    return res.json({ customerAccount });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Erreur serveur!" });
  }
};


export const getProfile = async (req: express.Request, res: express.Response) => {
  try {
    const customer = await customerRouteProtection(req, res);  
    return res.json({ customer: customer, success: "Connexion réussie" });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("jwt");
    return res.json({ success: "Déconnexion réussie!" }); 
  } catch (err) {
    console.log(err);
    return res.json({ error: "Erreur serveur!" });
  }
};
export const update = async (req: express.Request, res: express.Response) => {
  try {
   
    const { Name, Surname, Username, PhoneNumber, Email, Password } = req.body;

    
    if (!validateEmail(Email)) {
      return res.status(400).json({ error: "Email invalide" });
    }

    
    const customerId = req.params.customerId;

    
    const hashedPassword = await bcrypt.hash(Password, 10); 
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {
      Name,
      Surname,
      PhoneNumber,
      Email,
      Password: hashedPassword,
    }, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Le client n'a pas été trouvé" });
    }

    return res.status(200).json({ message: 'Le compte du client a été mis à jour avec succès', data: updatedCustomer });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur du serveur', data: error.message });
  }
};


export const getAllCustomers = async (
  req: express.Request,
  res: express.Response
) => {
  let AllCustomers = await Customer.find();
  return res.json({ AllCustomers });
};


export const activateCustomer = async (req: express.Request, res: express.Response) => {
  try {
    const { customerId } = req.body;
    let customer: any = await Customer.findById(customerId);

    if (!customer) {
      return res.json({ error: "Account doesn't exist!" });
    }

    customer.AccountActivationStatus = true;
    await customer.save();

    return res.json({ success: "Account Activated!" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};



export const disableAccount = async (req: express.Request, res: express.Response) => {
  try {
    const customerId = req.body.customerId; 
    let customer: any = await Customer.findById(customerId);

    if (!customer) {
      return res.json({ error: "Error!" });
    }

    customer.AccountActivationStatus = false;
    await customer.save();

    return res.json({ success: "Account Disabled!" });
  } catch (err) {
    console.log("Server Error!");
    return res.json({ error: "Server Error!" });
  }
};


export const sendPassResetEmail = async (req: express.Request, res: express.Response) => {
  try {

    const { customerEmail } = req.body;

    
    let existingCustomer: any = await Customer.findOne({
      Email: customerEmail,
    });

    
    if (!existingCustomer) {
      return res.json({ error: "Le compte n'existe pas !" });
    }

    
    existingCustomer.PassChangeLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );

    
    await sendPassResetEmail(
      existingCustomer.Name,
      existingCustomer.Email,
    
    );


    await existingCustomer.save();

    return res.json({ success: "Courriel de réinitialisation du mot de passe envoyé avec succès !" });
  } catch (err) {
    
    console.log(err);

  
    return res.json({ error: "Erreur du serveur, veuillez réessayer ultérieurement !" });
  }
};


export const ResetPassword = async (req: express.Request, res: express.Response) => {
  try {
  
    const { customerId, newPassword, confirmNewPassword } = req.body; 

    
    let existingCustomer: any = await Customer.findById(customerId);

   
    if (existingCustomer.PassChangeLinkExpDate < new Date()) {
      return res.json({ error: "Le lien a expiré" });
    }

    
    if (newPassword !== confirmNewPassword) {
      return res.json({ error: "Les mots de passe ne correspondent pas !" });
    }

    
    const newHashedPassword = bcrypt.hashSync(newPassword);
    existingCustomer.Password = newHashedPassword;
    await existingCustomer.save();

    
    return res.json({ success: "Mot de passe changé avec succès" });
  } catch (err) {
    
    console.log(err);

   
    return res.json({ error: "Erreur du serveur. Veuillez réessayer plus tard !" });
  }
};



export const sendVerificationLink = async (req: express.Request, res: express.Response) => {
  try {
  
    const { customerId, customerMail } = req.body; 

    
    if (!customerId || !customerMail) {
      return res.status(400).json({ error: "Données d'entrée manquantes ou incorrectes" });
    }

    
    let existingCustomer: any = await Customer.findOne({
      $or: [{ Email: customerMail }, { _id: customerId }],
    });

    
    if (!existingCustomer) {
      return res.status(404).json({ error: "Client introuvable. Veuillez réessayer plus tard" });
    }

   
    existingCustomer.VerLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );

    
    await SendCustomerAccountConfirmationMail(
      existingCustomer.Name,
      existingCustomer.Email,
      existingCustomer._id,
      existingCustomer.VerificationCode
    );

   
    await existingCustomer.save();

  
    return res.json({ success: "Lien de vérification envoyé avec succès" });
  } catch (err) {
    console.error(err);
  
    return res.status(500).json({ error: "Erreur du serveur. Veuillez réessayer plus tard" });
  }
};


export const googleAuth = async (
  req: express.Request,
  res: express.Response
) => {
  try {

    const { customerEmail } = req.body;

   
    let existingCustomer = await Customer.findOne({
      Email: customerEmail,
    });

   
    if (!existingCustomer) {
      return res.json({ error: "Le compte n'existe pas. Veuillez envisager de vous inscrire." });
    } else {
     
      return res.json({ compteClient: existingCustomer });
    }
  } catch (err) {
    
    console.log(err);
    return res.json({ error: "Erreur du serveur" });
  }
};






declare module "express" {
  interface Request {
    user: {
      _id: string;
      Surname:String;
      PhoneNumber:Number;
      },
      Email:String;
      Password: String;
    }
  
  }

// Créer une fonction pour valider l'email
const validateEmail = (Email: string) => {
  // Créer la regex pour valider l'email
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // Tester si l'email correspond à la regex
  return regex.test(Email);
};



export const Mauth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { Email, Password, PhoneNumber } = req.body;
    let customerAccount;
    let freelancerAccount;
    let companyAccount;

    
    if ((!Email && !PhoneNumber) || !Password) {
      return res.status(401).json({ error: "Entrée invalide" });
    } else if (!Email) {
    
      customerAccount = await Customer.findOne({ PhoneNumber });
    } else {
     
      customerAccount = await Customer.findOne({ Email });
    }

   
    if (!customerAccount) {
      return res.json({ error: "Le compte n'existe pas!" });
    }

    
    const passwordCheck = bcrypt.compareSync(Password, customerAccount.Password);
    if (!passwordCheck) {
      return res.status(404).json({ error: "Email ou mot de passe invalide!" });
    }

   
    if (customerAccount.AccountActivationStatus === false) {
      return res.json({
        emailError: "Vous devez d'abord vérifier votre adresse e-mail avant de vous connecter!",
      });
    }
    
   
    if(customerAccount.AccountVerficiationStatus == true){
      return res.json({ emailError: "Ce compte a été désactivé!" });
    }

    
    await generateCustomerToken(res, customerAccount._id); 
    return res.json({ customerAccount });
    
  } catch (err) {
    console.log(err);
    return res.json({ error: "Erreur serveur!" });
  }
}


export const getAllFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.query);
  let allfreelancers = await freelancer.find()
 
  
  return res.json({ allfreelancers });
};

export const saveFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { customerId, freelancerId } = req.params;

   
    const customer = await Customer.findById(customerId);
    const freelancer: any = await Freelancer.findById(freelancerId);
    const freelancerName = freelancer ? freelancer.Name : null;

    if (!customer || !freelancer) {
      return res.json({ error: "Invalid customer or freelancer ID" });
    }

   
    const existingSavedFreelancer = customer.savedFreelancers.find(
      (saved) => saved.freelancerId.toString() === freelancerId
    );

    if (existingSavedFreelancer) {
      return res.json({ error: "Freelancer already saved by the customer" });
    }

    await Customer.findByIdAndUpdate(
      customerId,
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

  
    await customer.save();

    return res.json({ success: "Freelancer saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};


export const unsaveFreelancer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { customerId, freelancerId } = req.params;


    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.json({ error: "Invalid customer ID" });
    }

    
    const existingSavedFreelancerIndex = customer.savedFreelancers.findIndex(
      (saved) => saved.freelancerId.toString() === freelancerId
    );

    if (existingSavedFreelancerIndex === -1) {
      return res.json({ error: "Freelancer not saved by the customer" });
    }

  
    customer.savedFreelancers.splice(existingSavedFreelancerIndex, 1);

 
    await customer.save();

    return res.json({ success: "Freelancer removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};


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


export const getSavedFreelancers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { customerId } = req.params;

   
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

 
    const savedFreelancers = customer.savedFreelancers;

    return res.json({ savedFreelancers });
  } catch (error) {
    console.error("Error in getSavedFreelancers:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};







// Define the route handler
export const createCustomerMobileAccount = async (req: express.Request, res: express.Response) => {
 
  console.log('Request Body:', req.body);
 
  try {
    // Destructure request body
    const {
      
        Name,
        LastName,
        Email,
        PhoneNumber,
        Password, 
        Location,
        City,
        Municipality,
        
      
    } = req.body;
    
    
    let existingCustomer = await Customer.findOne({
      $or: [{ Email: Email }, { PhoneNumber: PhoneNumber }],
    });
    
    if (existingCustomer) {
      return res.json({ error: "Account Exists Already" });
    }
    
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    
    for (let i = 0; i < 25; i++) {
      VerificationCode += characters[Math.floor(Math.random() * characters.length)];
    }
    
    const securePassword = bcrypt.hashSync(Password);
    
    
    const customerAccount: any = await Customer.create({
      Name,
      LastName,
      Email,
      Password: securePassword,
      PhoneNumber,
      VerificationCode,
      EstimateWorkLocation: {
        City,
        Municipality,
      },
      VerLinkExpDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      Location,
      // Other fields...
    });
    // Check if certain properties exist before using them
    if (
      customerAccount?.Name &&
      customerAccount?.Email &&
      customerAccount?._id &&
      customerAccount?.VerificationCode
    ) {
      // Assuming 'SendCustomerAccountConfirmationMail' is a function you've defined
      await SendCustomerAccountConfirmationMail(
        customerAccount.Name,
        customerAccount.Email,
        customerAccount._id,
        customerAccount.VerificationCode
      );
    } else {
      console.error("Invalid parameters for SendCustomerAccountConfirmationMail");
    }

    // Return success message
    return res.json({ success: "Account Created" });
  } catch (err) {
    // Handle errors and provide details
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};


import Customer from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCustomerAccountConfirmationMail, SendPasswordResetEmail } from "./nodemailerConfig";
import { customerRouteProtection } from "./routeProtectionMiddleware";
import generateCustomerToken from "./utils";
import generateFreelancerToken from "Freelancer/utils";
import generateCompanyToken from "Company/utils";
import freelancer from "Freelancer/modal";
import company from "Company/modal";




export const createCustomerAccount = async (req: express.Request, res: express.Response) => {
  try {
    const { ProfilePicture, Name, LastName, PhoneNumber, Email, Password, EstimateWorkLocation, Location, JoinDate, Reviews, PaymentMethodVerificationStatus, WorkOffered, MoneySpent } = req.body;

    if (!Name || !LastName || !PhoneNumber || !Email || !Password || !ProfilePicture || !EstimateWorkLocation || !Location) {
      return res.status(400).json({ error: "Informations manquantes" });
    }
    if (!EstimateWorkLocation || !EstimateWorkLocation.City || !EstimateWorkLocation.Municipality) {
      return res.status(400).json({ error: "Invalid EstimateWorkLocation" });
    }
    
    
    
    
    const { City, Municipality } = EstimateWorkLocation || {};
     const city = City || '';
     const municipality = Municipality || '';

    const checkAccountCustomer = await Customer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (checkAccountCustomer) {
      return res.status(400).json({ error: "Le compte existe déjà" });
    }

    const securePassword = bcrypt.hashSync(Password, 10);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode += characters[Math.floor(Math.random() * characters.length)];
    }

    const customer = await Customer.create({
      ProfilePicture,
      Name,
      LastName,
      PhoneNumber,
      Password: securePassword,
      Email,
      Location,
      VerificationCode,
      EstimateWorkLocation: {
        City: city,
        Municipality: municipality
      },
      JoinDate,
      Reviews,
      PaymentMethodVerificationStatus,
      WorkOffered,
      MoneySpent,
    });
    

   
     await SendCustomerAccountConfirmationMail(
    customer.Name,
    customer.Email,
    customer._id,
   customer.VerificationCode
     );

    return res.status(201).json({ success: "Le compte a été créé", customer });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur", message: error.message });
  }
};



export const verifyAccount = async (req: express.Request, res: express.Response) => {
  try {
    const customerId = req.params.customerId;
    const VerificationCode = req.params.VerificationCode;
    const unverifiedCustomer = await Customer.findById(customerId);
    if (!unverifiedCustomer) {
      return res.json({ error: "Le compte n'existe pas!" });
    }
    if (VerificationCode != unverifiedCustomer.VerificationCode) {
      return res.json({ error: "Réessayez ultérieurement!" });
    }
    unverifiedCustomer.AccountActivationStatus = true;
    await unverifiedCustomer.save();
    return res.json({ success: "Le compte a été vérifié, vous pouvez maintenant vous connecter!" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Erreur serveur!" });
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

    
    await SendPasswordResetEmail(
      existingCustomer.Name,
      existingCustomer.Email,
      existingCustomer._id
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


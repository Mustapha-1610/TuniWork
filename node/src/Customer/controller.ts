import Customer from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCustomerAccountConfirmationMail } from "./nodemailerConfig";
import { customerRouteProtection } from "./routeProtectionMiddleware";
import generateCustomerToken from "./utils";

export const createCustomerAccount = async (req: express.Request, res: express.Response) => {
  console.log();

  const { Name, Surname, Username, PhoneNumber, ProfilePicture, Email, Password } = req.body;

  try {
    if (!Name || !Surname || !Username || !PhoneNumber || !Email || !Password) { 
      return res.json({ error: "Informations manquantes" });
    }

    let checkAccountCustomer = await Customer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (checkAccountCustomer) {
      return res.json({ error: "Le compte existe déjà" });
    }

    const securePassword = bcrypt.hashSync(Password, 10); 

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode += characters[Math.floor(Math.random() * characters.length)];
    }

    const customer = await Customer.create({ 
      Name,
      Surname,
      Username,
      PhoneNumber,
      Password: securePassword,
      Email,
      VerificationCode: VerificationCode,
    });

    await SendCustomerAccountConfirmationMail(
      customer.Name,
      customer.Email,
      customer._id,
      customer.VerificationCode
    );

    return res.status(201).json({ success: "Le compte a été créé" }); 
  } catch (error) {
    return res.status(500).json({ success: "Erreur serveur", error: error.message });
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
    if (VerificationCode !== unverifiedCustomer.VerificationCode) {
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

export const auth = async (req: express.Request, res: express.Response) => { 
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

declare module "express" {
  interface Request {
    user: {
      _id: string;
      Surname:String;
      Username:  String;
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

export const update = async (req: express.Request, res: express.Response) => {
  try {
    // Extraire les champs que vous voulez mettre à jour du corps de la requête
    const { Name, Surname, Username, PhoneNumber, Email, Password } = req.body;

    // Vérifier les champs ici 
    if (!validateEmail(Email)) {
      return res.status(400).json({ error: "Email invalide" });
    }

    // Extraire l'identifiant du client de la requête 
    const customerId = req.params.customerId;

    // Utiliser findByIdAndUpdate pour mettre à jour les champs
    const hashedPassword = await bcrypt.hash(Password, 10); // Hacher le mot de passe
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {
      Name,
      Surname,
      Username,
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

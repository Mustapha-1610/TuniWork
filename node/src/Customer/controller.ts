import Customer from "./modal";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { SendCustomerAccountConfirmationMail, SendPasswordResetEmail } from "./nodemailerConfig";
import { customerRouteProtection } from "./routeProtectionMiddleware";
import generateCustomerToken from "./utils";







export const createCustomerAccount = async (req: express.Request, res: express.Response) => {

  const { Name, Surname, Username, PhoneNumber, ProfilePicture, Email, Password } = req.body;

  try {
    
    if (!Name || !Surname || !Username || !PhoneNumber || !Email || !Password) { 
      return res.json({ error: "Informations manquantes" });
    }

    // التحقق من عدم تكرار الحساب بواسطة البريد الإلكتروني أو رقم الهاتف
    let checkAccountCustomer = await Customer.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });

    if (checkAccountCustomer) {
      return res.json({ error: "Le compte existe déjà" });
    }

    // تشفير كلمة المرور
    const securePassword = bcrypt.hashSync(Password, 10); 

    // إنشاء كود تحقق عشوائي
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let VerificationCode = "";
    for (let i = 0; i < 25; i++) {
      VerificationCode += characters[Math.floor(Math.random() * characters.length)];
    }

    // إنشاء حساب العميل
    const customer = await Customer.create({ 
      Name,
      Surname,
      Username,
      PhoneNumber,
      Password: securePassword,
      Email,
      VerificationCode: VerificationCode,
    });

    // إرسال رسالة تأكيد الحساب
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

//  للتحقق من حساب العميل بعد تأكيد البريد الإلكتروني
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





export const auth = async (req: express.Request, res: express.Response) => { 
  try {
    
    const { Email, Password, PhoneNumber } = req.body;
    let customerAccount;

    
    if ((!Email && !PhoneNumber) || !Password) {
      return res.status(401).json({ error: "Entrée invalide" });
    } else if (!Email) {
      // البحث عن الحساب باستخدام رقم الهاتف إذا لم يتم توفير البريد الإلكتروني
      customerAccount = await Customer.findOne({ PhoneNumber });
    } else {
      // البحث عن الحساب باستخدام البريد الإلكتروني
      customerAccount = await Customer.findOne({ Email });
    }

    // التحقق من وجود الحساب
    if (!customerAccount) {
      return res.json({ error: "Le compte n'existe pas!" });
    }

    // التحقق من صحة كلمة المرور
    const passwordCheck = bcrypt.compareSync(Password, customerAccount.Password);
    if (!passwordCheck) {
      return res.status(404).json({ error: "Email ou mot de passe invalide!" });
    }

    // التحقق من تفعيل الحساب عبر البريد الإلكتروني
    if (customerAccount.AccountActivationStatus === false) {
      return res.json({
        emailError: "Vous devez d'abord vérifier votre adresse e-mail avant de vous connecter!",
      });
    }
    
    // التحقق من أن الحساب لم يتم تعطيله
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


// 
export const getAllCustomers = async (
  req: express.Request,
  res: express.Response
) => {
  let AllCustomers = await Customer.find();
  return res.json({ AllCustomers });
};

// Activer un client
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

    // البحث عن العميل باستخدام عنوان البريد الإلكتروني
    let existingCustomer: any = await Customer.findOne({
      Email: customerEmail,
    });

    // التحقق مما إذا كان العميل موجودًا
    if (!existingCustomer) {
      return res.json({ error: "Le compte n'existe pas !" });
    }

    // تعيين تاريخ انتهاء صلاحية رابط تغيير كلمة المرور
    existingCustomer.PassChangeLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );

    // إرسال بريد إلكتروني لإعادة تعيين كلمة المرور باستخدام الوظيفة SendPasswordResetEmail
    await SendPasswordResetEmail(
      existingCustomer.Name,
      existingCustomer.Email,
      existingCustomer._id
    );

    // حفظ التغييرات
    await existingCustomer.save();

    return res.json({ success: "Courriel de réinitialisation du mot de passe envoyé avec succès !" });
  } catch (err) {
    
    console.log(err);

  
    return res.json({ error: "Erreur du serveur, veuillez réessayer ultérieurement !" });
  }
};


export const ResetPassword = async (req: express.Request, res: express.Response) => {
  try {
    // استخراج معلومات إعادة تعيين كلمة المرور من جسم الطلب
    const { customerId, newPassword, confirmNewPassword } = req.body; 

    // البحث عن العميل باستخدام معرف العميل المقدم
    let existingCustomer: any = await Customer.findById(customerId);

    // التحقق من صلاحية رابط إعادة تعيين كلمة المرور
    if (existingCustomer.PassChangeLinkExpDate < new Date()) {
      return res.json({ error: "Le lien a expiré" });
    }

    // التحقق من تطابق كلمتي المرور الجديدة
    if (newPassword !== confirmNewPassword) {
      return res.json({ error: "Les mots de passe ne correspondent pas !" });
    }

    // هش كلمة المرور الجديدة وتحديثها في قاعدة البيانات
    const newHashedPassword = bcrypt.hashSync(newPassword);
    existingCustomer.Password = newHashedPassword;
    await existingCustomer.save();

    // إرجاع رسالة نجاح بعد تحديث كلمة المرور بنجاح
    return res.json({ success: "Mot de passe changé avec succès" });
  } catch (err) {
    // تسجيل أي خطأ في حالة حدوث خطأ في الخادم
    console.log(err);

    // إرجاع رسالة خطأ في حالة حدوث خطأ آخر
    return res.json({ error: "Erreur du serveur. Veuillez réessayer plus tard !" });
  }
};



export const sendVerificationLink = async (req: express.Request, res: express.Response) => {
  try {
  
    const { customerId, customerMail } = req.body; 

    // التحقق من وجود البيانات الضرورية
    if (!customerId || !customerMail) {
      return res.status(400).json({ error: "Données d'entrée manquantes ou incorrectes" });
    }

    // البحث عن العميل باستخدام البريد الإلكتروني أو المعرف
    let existingCustomer: any = await Customer.findOne({
      $or: [{ Email: customerMail }, { _id: customerId }],
    });

    // التحقق مما إذا كان العميل موجودًا
    if (!existingCustomer) {
      return res.status(404).json({ error: "Client introuvable. Veuillez réessayer plus tard" });
    }

    // تحديث تاريخ انتهاء صلاحية رابط التحقق
    existingCustomer.VerLinkExpDate = new Date(
      new Date().getTime() + 2 * 60 * 60 * 1000
    );

    // إرسال بريد التأكيد
    await SendCustomerAccountConfirmationMail(
      existingCustomer.Name,
      existingCustomer.Email,
      existingCustomer._id,
      existingCustomer.VerificationCode
    );

    // حفظ التغييرات على العميل
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

    // البحث عن العميل في قاعدة البيانات باستخدام عنوان البريد الإلكتروني المُقدم
    let existingCustomer = await Customer.findOne({
      Email: customerEmail,
    });

    // إذا لم يكن العميل موجودًا، فإن الرد يحتوي على خطأ
    if (!existingCustomer) {
      return res.json({ error: "Le compte n'existe pas. Veuillez envisager de vous inscrire." });
    } else {
      // إذا كان العميل موجودًا، يتم إرجاع معلومات حساب العميل
      return res.json({ compteClient: existingCustomer });
    }
  } catch (err) {
    // في حالة وجود خطأ، يتم تسجيل الخطأ وإرجاع رد بخطأ إلى العميل
    console.log(err);
    return res.json({ error: "Erreur du serveur" });
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



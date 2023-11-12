import express from "express";
import comapany from "../../Company/modal";
import companyWorkOffer from "./CompanyWorkOfferModal";
export const create = async (req: express.Request, res: express.Response) => {
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
    const PaymentMethodVerificationStatus =
      offeringCompany.PaymentMethodVerificationStatus;
    const CompanyName = offeringCompany.CompanyName;
    const CompanyLocation = offeringCompany.Location;
    const TotalWorkOfferd = offeringCompany.WorkOfferd;
    const TotalMoneyPayed = offeringCompany.MoneySpent;
    let workOffer = await companyWorkOffer.create({
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

import mongoose from "mongoose";
import workOfferSchema from "../Modal";
const Schema = mongoose.Schema;

// hethi takmalt l classe CustomerWorkOfferModal
const CompanyWorkOfferSchema = new Schema({
  // hethiya tekhou true wala false depending ken l company 3tatna d17 mte3ha w na7na 3malnenou verification
  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  CompanyLocation: {
    type: String,
  },
  CompanyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  // general informations 3al company to display fel work offer like we mentioned before
  TotalWorkOfferd: {
    type: Number,
  },
  TotalMoneyPayed: {
    type: Number,
  },
});

const CombinedCompanyWorkOfferSchema = new Schema({
  ...workOfferSchema.obj,
  ...CompanyWorkOfferSchema.obj,
});

export default mongoose.model(
  "companyWorkOffer",
  CombinedCompanyWorkOfferSchema
);

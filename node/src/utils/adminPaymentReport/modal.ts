import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminPaymentReportSchema = new Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  PaymentRequestId: {
    type: Schema.Types.ObjectId,
  },
  FreelancerInfos: {
    freelancerName: {
      type: String,
    },
    freelancerId: {
      type: String,
    },
  },
  companyInfos: {
    companyName: {
      type: String,
    },
    companyId: {
      type: String,
    },
  },
  WorkOfferId: {
    type: Schema.Types.ObjectId,
  },
});
export default mongoose.model("adminPaymentReport", adminPaymentReportSchema);

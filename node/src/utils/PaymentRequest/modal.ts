import mongoose from "mongoose";
const Schema = mongoose.Schema;
const paymentRequestSchema = new Schema({
  freelancerInfos: {
    freelancerId: {
      type: Schema.Types.ObjectId,
    },
    freelancerName: {
      type: String,
    },
  },
  companyInfos: {
    companyId: {
      type: Schema.Types.ObjectId,
    },
    companyName: {
      type: String,
    },
  },
});
export default mongoose.model("paymentRequest", paymentRequestSchema);

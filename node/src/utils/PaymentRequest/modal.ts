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
  PayInformations: {
    Totalpay: {
      type: Number,
    },
    TasksDone: [],
  },
  PWODetails: {
    Private: {
      type: Boolean,
      default: false,
    },
    Public: {
      type: Boolean,
      default: false,
    },
    _id: {
      type: Schema.Types.ObjectId,
    },
  },
  PaymentStatus: {
    type: String,
    enum: [
      "Awaiting Company Response",
      "Payment Sent",
      "Payment Declined",
      "Reported , Awaiting Admin Review",
    ],
    default: "Awaiting Company Response",
  },
  attachements: [],
});
export default mongoose.model("paymentRequest", paymentRequestSchema);

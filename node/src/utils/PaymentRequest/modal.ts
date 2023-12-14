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
    PayPerTask: {
      TotalPay: {
        type: Number,
      },
      NumberOfTasks: {
        type: Number,
      },
      TasksDone: [
        {
          type: String,
        },
      ],
    },
    PayPerHours: {
      TotalHoursWorked: {
        type: Number,
      },
      PayPerHour: {
        type: Number,
      },
      TotalPay: {
        type: Number,
      },
      TasksDone: [
        {
          type: String,
        },
      ],
    },
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
    Id: {
      type: Schema.Types.ObjectId,
    },
  },
});
export default mongoose.model("paymentRequest", paymentRequestSchema);

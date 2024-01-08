import mongoose from "mongoose";

const Schema = mongoose.Schema;

const privateJOfferSchema = new Schema({
  TaskTable: [
    {
      TaskTitle: {
        type: String,
      },
      TaskDoneStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
  PaymentRequest: {
    PaymentRequestId: {
      type: Schema.Types.ObjectId,
    },
    PaymentAmount: {
      type: Number,
    },
    PaymentStatus: {
      type: String,
      enum: [
        "Tasks Not Done",
        "Awaiting Company Response",
        "Payment Sent",
        "Payment Declined",
        "Reported , Awaiting Admin Review",
      ],
      default: "Tasks Not Done",
    },
  },


  Title: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Date,
  },

 

  CreationDate: {
    type: Date,
    default: new Date(),
  },

  Description: {
    type: String,
    required: true,
  },

  Note: {
    type: String,
  },


  WorkingFreelancer: {
    FreelancerName: {
      type: String,
    },
    FreelancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancer",
    },
  },
  PayRate: {
    PayPerHour: {
      type: Number,
      default: 0, 
    },
    PayPerTask: {
      type: Number,
      default: 0, 
    },
  },

 
  

  CustomerLocation: {
    type: String,
  },
  CustomerName: {
    type: String,
  },

  CustomerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },

  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },


  TotalWorkOfferd: {
    type: Number,
  },
  TotalMoneyPayed: {
    type: Number,
  },

  status: {
    type: String,
    enum: [
      "awaiting freelancer response",
      "accepted",
      "declined",
      "in progress",
      "done",
    ],
    default: "awaiting freelancer response",
  },

  DeadLine: {
    type: Date,
    required: true,
  },
});

const PrivateCJobOffer = mongoose.model(
  "PrivateCJobOffer",
  privateJOfferSchema
);

export default PrivateCJobOffer;
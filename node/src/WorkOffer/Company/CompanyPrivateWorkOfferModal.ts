import mongoose from "mongoose";
//import workOfferSchema from "../Modal";
const Schema = mongoose.Schema;

const privateWorkOfferSchema = new Schema({
  // (Mustapha)
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
  // title mta3 l post
  Title: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Date,
  },
  // l Work Title l matloub par example software engineer wala plumber li howa
  WorkTitle: {
    type: String,
  },

  // l post wa9teh tsan3et w got published
  CreationDate: {
    type: Date,
    default: new Date(),
  },

  // description mta3 l post ya3ni description 3al khedma in general par example raw 3andi sabela mkasra w n7eb chkoun isala7ha or so
  Description: {
    type: String,
    required: true,
  },

  // hethi extra note ken i7eb we7ed ikhaleha m3a l post (optional)
  Note: {
    type: String,
  },

  // hethi fel front bech n7otoulou yekhtar wether i7eb ikhales ya per task ya3ni 3la khedma kemla ya bel se3a
  PaymentMethod: {
    PayPerTask: {
      ExperienceLevel: {
        type: "String",
      },
      FixedPrice: {
        type: "String",
      },
    },
    PayPerHours: {
      // 9adeh men se3a lezem yekhdem fel jem3a par example 30 hours a week
      HoursPerWeek: {
        type: String,
      },
      // 9adeh l khedma estimated enha tched idk kima chehar
      Duration: {
        type: String,
      },
      // 9adeh bech ikhalsou bel se3a
      PayPerHour: {
        type: String,
      },
      // chnia l experience level matlouba ya begginer ya advanced or so
      ExperienceLevel: {
        type: String,
      },
    },
  },

  // lehne bech nkhaliw info l freelancer li actually ktheha l khedma
  WorkingFreelancer: {
    FreelancerName: {
      type: String,
    },
    FreelancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancer",
    },
  },

  CompanyName: {
    type: String,
    required: true,
  },

  Location: {
    type: String,
  },

  CompanyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  // hethiya tekhou true wala false depending ken l company 3tatna d17 mte3ha w na7na 3malnenou verification
  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },
  CompanySignature: {
    type: String,
  },

  // general informations 3al company to display fel work offer like we mentioned before
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

const PrivateJobOffer = mongoose.model(
  "PrivateJobOffer",
  privateWorkOfferSchema
);

export default PrivateJobOffer;

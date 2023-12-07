import mongoose from "mongoose";
const Schema = mongoose.Schema;
const companySchema = new Schema({
  CompanyName: {
    type: String,
    required: true,
  },

  CompanyEmail: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  CompanyWebsite: {
    type: String,
    required: true,
  },

  CompanySignature: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/tuniwork-4e603.appspot.com/o/CompanyImages%2Ftest%20sig.jpg?alt=media&token=a3c9e08e-9a01-4274-89b8-39ae26dfd2e8",
  },

  ProfilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
  },

  CompanyDescription: {
    type: String,
    required: true,
  },

  CompanyPhone: {
    type: Number,
    required: true,
  },

  Location: {
    type: String,
    required: true,
  },

  VerificationCode: {
    type: String,
  },

  AccountActivationStatus: {
    type: Boolean,
    default: true,
  },
  AccountVerificationStatus: {
    type: Boolean,
    default: false,
  },

  JoinDate: {
    type: Date,
    default: new Date(),
  },

  // ****************further dev **********************

  Reviews: {
    type: Number,
    default: 0,
  },

  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },

  // what does this do
  WorkOfferd: {
    type: Number,
    default: 0,
  },

  MoneySpent: {
    type: Number,
    default: 0,
  },

  savedFreelancers: [
    {
      freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "Freelancer",
      },
      freelancerName: {
        type: String,
      },
    },
  ],
  freelancerSentContracts: [
    {
      type: String,
      default: null,
    },
  ],

  WorkTitle: {
    WorkTitleId: { type: Schema.Types.ObjectId, ref: "Work" },
    WorkTitleText: {
      type: String,
    },
  },

  EstimateWorkLocation: {
    City: {
      type: String,
    },
    Municipality: {
      type: String,
    },
  },

  Languages: [
    {
      type: String,
    },
  ],
});
export default mongoose.model("Company", companySchema);

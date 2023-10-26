import mongoose from "mongoose";
const Schema = mongoose.Schema;
const freelancerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  ProfilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
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
  AccountVerficiationStatus: {
    type: Boolean,
    default: false,
  },
  Earnings: {
    type: Number,
    default: 0,
  },
  PayRate: {
    HourlyRate: {
      type: Number,
      required: true,
    },
    PayPerTaskRate: {
      type: Number,
      required: true,
    },
  },
  WorkHistory: [
    {
      Ongoing: [
        {
          TaskTitle: {
            type: String,
          },
          TaskHolder: {
            type: Schema.Types.ObjectId,
          },
          DueDate: {
            type: Date,
          },
        },
      ],
      Finiched: [
        {
          TaskTitle: {
            type: String,
          },
          TaskHolder: {
            type: Schema.Types.ObjectId,
          },
          EarningsMade: {
            type: Number,
          },
          Review: {
            type: String,
          },
        },
      ],
    },
  ],
  Schedule: {
    Weekly: {
      type: Date,
    },
    Monthly: {
      type: Date,
    },
  },
  Messages: [
    {
      type: String,
    },
  ],
  Languages: [
    {
      type: String,
      required: true,
    },
  ],
  EstimateWorkLocation: {
    type: String,
    required: true,
  },
  WorkTitle: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Work",
  },
  Speciality: [
    {
      type: Schema.Types.ObjectId,
      ref: "Work",
      required: true,
    },
  ],
});
export default mongoose.model("freelancer", freelancerSchema);

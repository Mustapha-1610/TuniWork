import mongoose from "mongoose";
const Schema = mongoose.Schema;
import usersSchema from "../Users/modal";
const freelancerSchema = new Schema({
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
    Weekly: [
      {
        type: Date,
      },
    ],
    Monthly: [
      {
        type: Date,
      },
    ],
  },
  Messages: [
    {
      type: String,
    },
  ],
  Languages: [
    {
      type: String,
    },
  ],
  EstimateWorkLocation: {
    type: String,
    required: true,
  },
  WorkTitle: {
    WorkTitleId: { type: Schema.Types.ObjectId, ref: "Work" },
    WorkTitleText: {
      type: String,
    },
  },
  SavedWorkOffers: [
    {
      WorkId: {
        type: Schema.Types.ObjectId,
        ref: "PublicWorkOffer",
      },
      WorkTitle: {
        type: String,
      },
      WorkDescription: {
        type: String,
      },
    },
  ],
  Speciality: [{ type: String }],
  VerLinkExpDate: { type: Date },
  PassChangeLinkExpDate: { type: Date },

  //zyedet l array ta3 private job offer
  ProposedPrivateWorks: [
    {
      PrivateJobOfferId: {
        type: Schema.Types.ObjectId,
        ref: "PrivateJobOffer",
      },
      Status: {
        type: String,
        enum: [
          "awaiting response",
          "accepted",
          "declined",
          "in progress",
          "done",
        ],
        default: "awaiting response",
      },
    },
  ],

  //wa9teli freelancer yapply for a public job tetsajel lenna
  pendingWorkOffers: [
    {
      PublicJobOfferId: {
        type: Schema.Types.ObjectId,
        ref: 'PublicJobOffer',
      },
      Status: {
        type: String,
        enum: [
          'awaiting company response',
          'accepted',
          'rejected',
          'in progress',
          'done',
        ],
        default: "awaiting company response",
      },
      /*PWOInfos: {
        CName: {
          type: String,
        },
        TitlePWO: {
          type: String,
        },
        DescriptionPWO: {
          type: String,
        },
      },*/
    },
  ],

});
const CombinedFreelancerSchema = new Schema({
  ...usersSchema.obj,
  ...freelancerSchema.obj,
});

export default mongoose.model("freelancer", CombinedFreelancerSchema);

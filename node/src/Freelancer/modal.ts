import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "../Users/modal";
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
  WorkHistory: {
    Ongoing: [
      {
        TaskTitle: {
          type: String,
        },
        TaskDescription: {
          type: String,
        },
        TaskHolder: {
          type: Schema.Types.ObjectId,
        },
        DueDate: {
          type: Date,
        },
        taskId: {
          type: Schema.Types.ObjectId,
        },
        default: [],
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
        taskId: {
          type: Schema.Types.ObjectId,
        },
        Review: {
          type: String,
        },
        default: [],
      },
    ],
  },

  Schedule: [
    {
      type: Date,
      default: null,
    },
  ],
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
    City: {
      type: String,
    },
    Municipality: {
      type: String,
    },
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
      Title: {
        type: String,
      },
      Description: {
        type: String,
      },
    },
  ],

  //wa9teli freelancer yapply for a public job tetsajel lenna
  pendingWorkOffers: [
    {
      PublicJobOfferId: {
        type: Schema.Types.ObjectId,
        ref: "PublicJobOffer",
      },
      Status: {
        type: String,
        enum: [
          "awaiting company response",
          "accepted",
          "rejected",
          "in progress",
          "done",
        ],
        default: "awaiting company response",
      },
      PWOInfos: {
        CName: {
          type: String,
        },
        TitlePWO: {
          type: String,
        },
        DescriptionPWO: {
          type: String,
        },
      },
    },
  ],
  CompanyRecievedContracts: [
    {
      ContractUrl: {
        type: String,
      },
      ContrantName: {
        type: String,
      },
      CreationDate: {
        type: Date,
      },
      acceptanceState: {
        type: Boolean,
        default: false,
      },
      ResponseState: {
        type: Boolean,
        default: false,
      },
      workOfferInformations: {
        TaskTitle: {
          type: String,
        },
        TaskDescription: {
          type: String,
        },
        TaskHolder: {
          type: Schema.Types.ObjectId,
        },
        DueDate: {
          type: Date,
        },
        taskId: {
          type: Schema.Types.ObjectId,
        },
        PublicWO: {
          type: Boolean,
          default: false,
        },
      },
    },
  ],
  AccountCreationDate: {
    type: Date,
    default: new Date(),
  },
  Notifications: [
    {
      NotificationMessage: {
        type: String,
        required: true,
      },
      readStatus: {
        type: Boolean,
        default: false,
      },
      senderInformations: {
        senderId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        senderUserType: {
          type: String,
          required: true,
        },
        creationDate: {
          type: Date,
        },
        context: {
          type: String,
        },
        objectId: {
          type: Schema.Types.ObjectId,
        },
      },
    },
  ],
  PaymentRequests: [
    {
      PaymentRequestId: {
        type: Schema.Types.ObjectId,
      },
      FreelancerName: {
        type: String,
      },
      CompanyName: {
        type: String,
      },
      PaymentAmount: {
        type: Number,
      },
      TaskTitle: {
        type: String,
      },
      workOfferId: {
        type: Schema.Types.ObjectId,
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
    },
  ],
});
const freelancer = User.discriminator("freelancer", freelancerSchema);
export default freelancer;

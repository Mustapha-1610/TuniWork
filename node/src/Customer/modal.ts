import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
 
  PhoneNumber: {
    type: String,
    required: false,
  },
  ProfilePicture: {
    type: String,
    required:false,
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
  Reviews: {
    type: Number,
    default: 0,
  },

  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },

  
  WorkOfferd: {
    type: Number,
    default: 0,
  },

  MoneySpent: {
    type: Number,
    default: 0,
  },
   JoinDate: {
    type: Date,
    default: new Date(),
  },
  
  
  VerificationCode: {
    type:String
  },
  AccountActivationStatus: {
    type: Boolean,
    default: false,
  },
  AccountVerficiationStatus: {
    type: Boolean,
    default: true,
  },

  EstimateWorkLocation: {
    City: {
      type: String,
    },
    Municipality: {
      type: String,
    },
  },
  Location: {
    type: String,
    required: true,
  },

  


savedFreelancers: [
  {
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer',
    },
    freelancerName: {
      type: String,
    },
  },
]
});




export default mongoose.model("customer", customerSchema);

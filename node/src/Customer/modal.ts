import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  Username: {
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
 
  
  projecthistory: {
    type: String
  },
  reviews: {
    type: Number,
    require,
  },
  
  budget: {
    type: Number
  },

  skills: {
    type: [String]
  },
  timeframe: {
    type: String
  },

  cover: {
    type: String
  },
  images: {
    type: [String],
    require,
  },
  location: {
    type: String
  },
  cuntry: {
    type:[String]
  },
  cat: {
    type:String,
    require,
  },
  Title: {
    type:[String]
  },
  desc: {
    type:String,
    required:false,
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
      ref: 'Freelancer',
    },
    freelancerName: {
      type: String,
    },
  },
]
});

customerSchema.methods.addSkill = function(skill: any) {
  this.skills.push(skill);
  return this.save();
};

export default mongoose.model("customer", customerSchema);


import mongoose from "mongoose";
const Schema = mongoose.Schema;
const companySchema = new Schema({

   //CHEF(CEO) INFOS
  /*ChefName: {
    type: String,
    required: true,
  },
  ChefSurname: {
    type: String,
    required: true,
  },

  ChefProfilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
  },

  ChefEmail: {
    type: String,
    required: true,
    unique: true,
  },



  ChefCin: {
    type: Number,
    required: true,
  },

  ChefPhone: {
    type: Number,
    required: true,
  },*/



  
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

  CompanyLogo: {
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
  AccountVerficiationStatus: {
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


  //CV w tasri7 document
});
export default mongoose.model("Company", companySchema);

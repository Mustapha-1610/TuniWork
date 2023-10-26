import mongoose from "mongoose";
const Schema = mongoose.Schema;
const companySchema = new Schema({

  //CHEF(CEO) INFOS
  ChefName: {
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

  Password: {
    type: String,
    required: true,
  },

  ChefCin: {
    type: Number,
    required: true,
  },

  ChefPhone: {
    type: Number,
    required: true,
  },

  //CV w tasri7 document

  //COMPANY INFOS


  CompanyName: {
    type: String,
    required: true,
  },
  CompanyWebsite: {
    type: String,
    required: true,
  },

  CompanyEmail: {
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

  //na3mlou address irl?

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
});
export default mongoose.model("Company", companySchema);

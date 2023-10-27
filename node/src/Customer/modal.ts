


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
    type: Number,
    required: false,
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
<<<<<<< HEAD
  VerificationCode: {
    type: String,
  },
  AccountActivationStatus: {
    type: Boolean,
    default: true,
  },
  AccountVerficiationStatus: {
    type: Boolean,
    default: true,
  },
=======
>>>>>>> 30dc9dc59aaaa1632e8b75db96c9ccb8b76e67d8
});
export default mongoose.model("customer", customerSchema);

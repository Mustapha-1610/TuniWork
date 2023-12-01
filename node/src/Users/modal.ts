import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the base usersSchema with a discriminator key
const usersSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
});

// Create the base User model from the usersSchema
export default usersSchema;

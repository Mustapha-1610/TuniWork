
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ConversationSchema = new Schema(
  {
   
    id: {
      type: String,
      required: true,
      unique: true,
    },
    
   
    customerId: {
      type: String,
      required: true,
    },
   
    readByFreelancer: {
      type: Boolean,
      required: true,
    },
    
    readCustomer: {
      type: Boolean,
      required: true,
    },
    
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
  
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);


import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PublicJobOffresCustomerSchemaDef = new Schema({

 
  Title: {
    type: String,
    required: true,
  },

  WorkTitle: {
    type: String,
  },


  CreationDate: {
    type: Date,
    default: new Date(),
  },


  Description: {
    type: String,
    required: true,
  },


  Note: {
    type: String,
  },
  
  
  SizeP: {
    type: String,
    enum: ["Large", "Medium", "Small"],
    default: "Medium",
    required: true
  },

 
  PaymentMethod: {
    PayPerTask: {
      ExperienceLevel: {
        type: "String",
      },
      FixedPrice: {
        type: "String",
      },
    },
    PayPerHours: {
      HoursPerWeek: {
        type: String,
        default:"0"
      },
      Duration: {
        type: String,
      },
      PayPerHour: {
        type: String,
        default:"0"
      },
    },
  },


  WorkingCustomer: {  
    CustomerName: {  
      type: String,
    },
    CustomerId: {  
      type: Schema.Types.ObjectId,
      ref: "Customer",  
    },
  },

  
  CustomerName: {  
    type: String,
    required: true,
  },


  Location: {
    type: String,
  },

 
  CustomerId: { 
    type: Schema.Types.ObjectId,
    ref: "Customer",  
  },

 
  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },
 
 
  TotalWorkOffered: { 
    type: Number,
  },

 
  TotalMoneyPaid: { 
    type: Number,
  },

  
  status: {
    type: String,
    enum: [
      "awaiting customer response",  
      "accepted",
      "declined",
      "in progress",
      "done",
    ],
    default: "awaiting customer response",  
  },

 
  DeadLine: {
    type: Date,
    required: true,
  },
});

const PublicJobOffresCustomerModel = mongoose.model(
  "PublicJobOffresCustomer",
  PublicJobOffresCustomerSchemaDef
);


export default PublicJobOffresCustomerSchemaDef;

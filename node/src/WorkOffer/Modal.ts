import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the base usersSchema with a discriminator key
const workOfferSchema = new Schema({
  // title mta3 l post
  Title: {
    type: String,
    required: true,
  },
  // l Work Title l matloub par example software engineer wala plumber li howa
  WorkTitle: {
    type: String,
  },
  // l post wa9teh tsan3et w got published
  CreationDate: {
    type: Date,
    default: new Date(),
  },
  // description mta3 l post ya3ni description 3al khedma in general par example raw 3andi sabela mkasra w n7eb chkoun isala7ha or so
  Description: {
    type: String,
    required: true,
  },
  // hethi extra note ken i7eb we7ed ikhaleha m3a l post (optional)
  Note: {
    type: String,
  },
  // hethi fel front bech n7otoulou yekhtar wether i7eb ikhales ya per task ya3ni 3la khedma kemla ya bel se3a
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
      // 9adeh men se3a lezem yekhdem fel jem3a par example 30 hours a week
      HoursPerWeek: {
        type: String,
      },
      // 9adeh l khedma estimated enha tched idk kima chehar
      Duration: {
        type: String,
      },
      // 9adeh bech ikhalsou bel se3a
      PayPerHour: {
        type: String,
      },
      // chnia l experience level matlouba ya begginer ya advanced or so
      ExperienceLevel: {
        type: String,
      },
    },
  },
  // l specialité l matlouba par example software engineer w matloub enou pro fel front w back end wala back end barka etc
  WorkSpeciality: [
    {
      type: String,
      required: true,
    },
  ],
  // hethiya bech nkhaliw feha info 3al freelancers li applied for work offer bech l company tchoufehom
  AppliedFreelancers: [
    {
      FreelancerName: {
        type: String,
      },
      FreelancerId: {
        type: Schema.Types.ObjectId,
        ref: "freelancer",
      },
    },
  ],
  // lehne bech nkhaliw info l freelancer li actually ktheha l khedma
  WorkingFreelancer: {
    FreelancerName: {
      type: String,
    },
    FreelancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancer",
    },
  },
});

// Create the base User model from the usersSchema
export default workOfferSchema;

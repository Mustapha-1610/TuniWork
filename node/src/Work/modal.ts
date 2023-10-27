import mongoose from "mongoose";
const Schema = mongoose.Schema;
const workTypeSchema = new Schema({
  WorkTitle: {
    type: String,
  },
  Speciality: [
    {
      WorkSpeciality: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});
export default mongoose.model("workType", workTypeSchema);

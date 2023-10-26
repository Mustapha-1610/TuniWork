import mongoose from "mongoose";
const Schema = mongoose.Schema;
const workTypeSchema = new Schema({
  WorkType: [
    {
      WorkTitle: {
        type: String,
      },
      Speciality: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});
export default mongoose.model("workType", workTypeSchema);

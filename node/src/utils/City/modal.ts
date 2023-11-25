import mongoose from "mongoose";
const Schema = mongoose.Schema;
const citySchema = new Schema({
  City: {
    type: String,
  },

  Municipality: [
    {
      type: String,
    },
  ],
});
export default mongoose.model("city", citySchema);

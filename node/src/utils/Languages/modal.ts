import mongoose from "mongoose";
const Schema = mongoose.Schema;
const languagesSchema = new Schema({
  Languages: [
    {
      type: String,
    },
  ],
});
export default mongoose.model("languages", languagesSchema);

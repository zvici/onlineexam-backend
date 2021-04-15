import mongoose from "mongoose";

const questionsSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    responses: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Questions = mongoose.model("Questions", questionsSchema);

export default Questions;

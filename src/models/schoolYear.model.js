import mongoose from "mongoose";

const schoolYearSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const SchoolYear = mongoose.model(
  "SchoolYear",
  schoolYearSchema
);

export default SchoolYear;

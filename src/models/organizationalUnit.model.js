import mongoose from "mongoose";

const organizationalUnitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const OrganizationalUnit = mongoose.model(
  "OrganizationalUnit",
  organizationalUnitSchema
);

export default OrganizationalUnit;

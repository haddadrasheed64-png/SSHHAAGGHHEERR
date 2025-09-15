import mongoose from "mongoose";
const USER_SCHEMA = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  office_name: { type: String, required: false, default: "" },
  phone_number: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  VIP: { type: Boolean, required: false, default: false },
  limit: { type: Number, default: 1 },
  apartments: { type: [{ apartment_id: String }], default: [] },
});
export default mongoose.model("User", USER_SCHEMA);

import mongoose from "mongoose";
const WEBSITE_SCHEMA = new mongoose.Schema({
  visits: { type: Number, required: false, default: 0 },
  call_or_copy_owner_phone: { type: [String], required: false, default: [] },
  my_number_copies: { type: Number, required: false, default: 0 },
  clicks_on_apartments: { type: [String], required: false },
});
export default mongoose.model("Website", WEBSITE_SCHEMA);

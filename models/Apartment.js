import mongoose from "mongoose";
const APARTMENT_SCHEMA = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  images: { type: [{ url: String, public_id: String }], required: false },
  rooms: { type: Number, required: true },
  gender: { type: String, required: true },
  rent: { type: Number, required: true },
  payment_method: { type: String, required: true },
  services: {
    type: {
      solar_power: Boolean,
      internet: Boolean,
      main_water: Boolean,
      office: Boolean,
      secure_month: Boolean,
    },
    default: {},
  },
  description: { type: String, required: true },
  owner_phone: { type: Number, required: true },
});
export default mongoose.model("Apartment", APARTMENT_SCHEMA);

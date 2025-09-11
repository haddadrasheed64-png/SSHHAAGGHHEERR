import mongoose from "mongoose";
const APARTMENT_SCHEMA = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  images: {
    type: [
      {
        url: String,
        public_id: String,
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],
    required: false,
  },
  rooms: { type: Number, required: true },
  gender: { type: String, required: true },
  // نوع الإدراج: بيع أم إيجار
  listing_type: { type: String, enum: ["sell", "rent"], required: true, default: "rent" },
  // السعر للإيجار (شهري/سلف ...)
  rent: { type: Number, required: false },
  payment_method: { type: String, required: false },
  // السعر للبيع
  sale_price: { type: Number, required: false },
  // العملة: دولار أم ليرة سورية
  currency: { type: String, enum: ["USD", "SYP"], required: true, default: "SYP" },
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

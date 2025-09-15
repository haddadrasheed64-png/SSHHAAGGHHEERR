import Apartment from "../models/Apartment.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: "dcvmfnhhk",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const Add_Apartment = async (req, res) => {
  try {
    const {
      title,
      location,
      images, // يحتوي على { url, public_id, type }
      rooms,
      gender,
      rent,
      payment_method,
      services,
      description,
      owner_phone,
      email,
      listing_type,
      currency,
      sale_price,
      status,
    } = req.body;

    const The_User = await User.findOne({ email });
    if (!The_User)
      return res.status(401).json({ message: "عذرا, لم تقم بتسجيل الدخول" });
    if (The_User.limit <= 0)
      return res
        .status(401)
        .json({ message: "لقد بلغت الحد الأقصى المجاني للنشر" });

    // حذف النسخ الأصلية من الفيديو
    for (const file of images) {
      if (file.type === "video" && file.public_id) {
        try {
          await cloudinary.uploader.destroy(file.public_id, {
            type: "video",
          });
          console.log(`تم حذف الفيديو الأصلي: ${file.public_id}`);
        } catch (err) {
          console.error("فشل حذف الفيديو الأصلي:", file.public_id, err);
        }
      }
    }

    // تحقق بسيط من الحقول بحسب نوع الإدراج
    if (!listing_type || !["sell", "rent"].includes(listing_type)) {
      return res
        .status(400)
        .json({ message: "يجب تحديد نوع الإعلان بيع أم إيجار" });
    }
    if (!currency || !["USD", "SYP"].includes(currency)) {
      return res.status(400).json({ message: "العملة غير صحيحة" });
    }
    if (listing_type === "sell") {
      if (!sale_price || Number(sale_price) <= 0) {
        return res.status(400).json({ message: "يرجى إدخال سعر البيع" });
      }
    } else if (listing_type === "rent") {
      if (!rent || Number(rent) <= 0) {
        return res.status(400).json({ message: "يرجى إدخال قيمة الإيجار" });
      }
      if (!payment_method) {
        return res.status(400).json({ message: "يرجى تحديد طريقة الدفع" });
      }
    }

    // إنشاء العقار
    const new_apartment = new Apartment({
      title,
      location,
      images, // هنا نحتفظ فقط بالرابط المضغوط
      rooms,
      gender,
      listing_type,
      rent: listing_type === "rent" ? rent : undefined,
      payment_method: listing_type === "rent" ? payment_method : undefined,
      sale_price: listing_type === "sell" ? sale_price : undefined,
      currency,
      services,
      description,
      owner_phone,
      status,
    });
    const saved = await new_apartment.save();

    The_User.limit -= 1;
    The_User.apartments.push({ apartment_id: saved._id });
    await The_User.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

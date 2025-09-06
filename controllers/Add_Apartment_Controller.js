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

    // إنشاء الشقة
    const new_apartment = new Apartment({
      title,
      location,
      images, // هنا نحتفظ فقط بالرابط المضغوط
      rooms,
      gender,
      rent,
      payment_method,
      services,
      description,
      owner_phone,
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

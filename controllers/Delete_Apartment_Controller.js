import Apartment from "../models/Apartment.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// ضبط بيانات Cloudinary (خليهم في .env)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const Delete_Apartment = async (req, res) => {
  const { apartment_id, email } = req.body;

  const The_Apartment = await Apartment.findOne({ _id: apartment_id });
  const The_User = await User.findOne({ email: email });

  if (!The_Apartment)
    return res.status(404).json({ message: "الشقة غير موجودة" });
  if (!The_User) return res.status(401).json({ message: "المستخدم غير موجود" });
  if (!The_User.apartments.some((apt) => apt.apartment_id === apartment_id))
    return res.status(401).json({ message: "الشقة ليست لك" });

  try {
    // حذف كل الصور والفيديوهات المرتبطة بالشقة من Cloudinary
    for (const media of The_Apartment.images) {
      if (media.public_id) {
        const type = media.type == "video" ? "video" : "image";
        await cloudinary.uploader.destroy(media.public_id, {
          resource_type: type,
        });
      }
    }

    await The_Apartment.deleteOne();
    The_User.apartments = The_User.apartments.filter(
      (apt) => apt.apartment_id !== apartment_id
    );
    await The_User.save();

    res.status(200).json({ message: "تم حذف الشقة والصور بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء الحذف" });
  }
};

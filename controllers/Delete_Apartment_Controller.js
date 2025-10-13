import Apartment from "../models/Apartment.js";
import User from "../models/User.js";
import { getCloudinaryInstance } from "../config/cloudinary.js";

export const Delete_Apartment = async (req, res) => {
  const { apartment_id, email } = req.body;

  const The_Apartment = await Apartment.findOne({ _id: apartment_id });
  const The_User = await User.findOne({ email: email });

  if (!The_Apartment)
    return res.status(404).json({ message: "العقار غير موجود" });
  if (!The_User) return res.status(401).json({ message: "المستخدم غير موجود" });
  if (!The_User.apartments.some((apt) => apt.apartment_id === apartment_id))
    return res.status(401).json({ message: "العقار ليست لك" });

  try {
    // ✅ احصل على حساب Cloudinary الصحيح بناءً على رقم المخزن
    const cloud = getCloudinaryInstance(The_Apartment.storage);

    // حذف كل الصور والفيديوهات من الحساب الصحيح
    for (const media of The_Apartment.images || []) {
      if (media.public_id) {
        const type = media.type === "video" ? "video" : "image";
        try {
          await cloud.uploader.destroy(media.public_id, {
            resource_type: type,
          });
          console.log(`تم حذف ${type}: ${media.public_id}`);
        } catch (err) {
          console.error(`فشل حذف ${type}: ${media.public_id}`, err);
        }
      }
    }

    // حذف العقار من قاعدة البيانات
    await The_Apartment.deleteOne();

    // تحديث العقارات الخاصة بالمستخدم
    The_User.apartments = The_User.apartments.filter(
      (apt) => apt.apartment_id !== apartment_id
    );
    await The_User.save();

    res.status(200).json({ message: "تم حذف العقار والصور والفيديوهات بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء الحذف" });
  }
};

import Apartment from "../models/Apartment.js";
import User from "../models/User.js";

export const Add_Apartment = async (req, res) => {
  try {
    const {
      title,
      location,
      images,
      rooms,
      gender,
      rent,
      payment_method,
      services,
      office_name,
      secure_month,
      description,
      owner_phone,
      email,
    } = req.body;

    const The_User = await User.findOne({ email: email });
    if (!The_User) {
      res.status(401).json({ message: "عذرا, لم تقم بتسجيل الدخول" });
    }
    if (The_User.limit <= 0) {
      res.status(401).json({ message: "لقد بلغت الحد الأقصى المجاني للنشر" });
    }
    if (The_User.limit > 0) {
      const new_apartment = new Apartment({
        title,
        location,
        images,
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
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

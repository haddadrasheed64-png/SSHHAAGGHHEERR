// controllers/AuthController.js
import User from "../models/User.js";

export const Login = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      office_name,
      phone_number,
      email,
      password,
    } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        first_name,
        last_name,
        office_name: office_name ?? "",
        phone_number,
        email,
        password,
        limit: 1,
        apartments: [],
      });
      const saved = await user.save();
      return res.status(201).json(saved);
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }
    if (user.phone_number !== phone_number) {
      return res
        .status(401)
        .json({ message: "هذا الحساب موجود برقم موبايل مختلف" });
    }

    user.first_name = first_name ?? user.first_name;
    user.last_name = last_name ?? user.last_name;
    user.office_name = office_name ?? user.office_name;

    const saved2 = await user.save();
    return res.status(200).json(saved2);
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر" });
  }
};

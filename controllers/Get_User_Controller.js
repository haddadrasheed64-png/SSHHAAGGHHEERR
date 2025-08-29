import User from "../models/User.js";

export const Get_User = async (req, res) => {
  try {
    const { email, phone_number } = req.body;
    const The_User = await User.findOne({
      email: email,
      phone_number: phone_number,
    });
    if (!The_User) {
      res.status(404).json({ message: "المستخدم غير موجود" });
    }
    res.status(200).json(The_User);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

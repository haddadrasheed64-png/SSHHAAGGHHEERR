import User from "../models/User.js";

export const Get_All_Users = async (req, res) => {
  try {
    const Users = await User.find();
    if ((await Users).length === 0) {
      res.status(404).json({ message: "لا يوجد مستخدمين نهائيا" });
    }
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

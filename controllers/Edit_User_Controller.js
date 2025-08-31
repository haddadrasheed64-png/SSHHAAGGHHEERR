import User from "../models/User.js";

export const Edit_User = async (req, res) => {
  try {
    const {
      new_first_name,
      new_last_name,
      new_office_name,
      new_phone_number,
      new_email,
      new_password,
    } = req.body;
    const The_User = await User.findOne({ email: new_email });
    if (!The_User) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    The_User.first_name = new_first_name;
    The_User.last_name = new_last_name;
    The_User.office_name = new_office_name || "";
    The_User.phone_number = new_phone_number;
    if (new_password) {
      The_User.password = new_password;
    }
    await The_User.save();
    res.status(200).json(The_User);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

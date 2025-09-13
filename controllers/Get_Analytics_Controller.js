import Website from "../models/Website.js";

export const Get_Analytics = async (req, res) => {
  try {
    const The_Website = await Website.findOne();
    if (!The_Website) {
      return res.status(404).json({ message: "الاحصائيات غير موجودة" });
    }
    return res.status(200).json(The_Website);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

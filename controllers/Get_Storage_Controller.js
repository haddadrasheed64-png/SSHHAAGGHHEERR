import Apartment from "../models/Apartment.js";

export const Get_Storage = async (req, res) => {
  try {
    // جلب آخر عقار مضاف بناءً على createdAt
    const The_Last_Apartment = await Apartment.findOne().sort({
      createdAt: -1,
    });

    if (!The_Last_Apartment) {
      // إذا ما في عقارات، نبدأ من 1
      return res.json({ storage: 1 });
    }

    // إرجاع رقم التخزين للعقار الأخير
    return res.json({ storage: The_Last_Apartment.storage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

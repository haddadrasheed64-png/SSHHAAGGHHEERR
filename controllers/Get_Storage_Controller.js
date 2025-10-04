import Apartment from "../models/Apartment.js";

export const Get_Storage = async (req, res) => {
  try {
    // جلب كل العقارات
    const lastApartment = await Apartment.findOne().sort({ createdAt: -1 });

    if (!lastApartment) {
      // إذا ما في عقارات، نبدأ من 1
      return res.json({ storage: 1 });
    }
    console.log(lastApartment);
    return res.json({ storage: lastApartment.storage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

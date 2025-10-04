import Apartment from "../models/Apartment.js";

export const Get_Storage = async (req, res) => {
  try {
    // جلب كل العقارات
    const apartments = await Apartment.find();

    if (!apartments || apartments.length === 0) {
      // إذا ما في عقارات، نبدأ من 1
      return res.json({ storage: 1 });
    }

    // نعتبر أن العقار الأحدث هو آخر عنصر في القائمة (لو العقارات تُضاف في قاعدة البيانات بالترتيب)
    // أو نبحث عن العقار صاحب أكبر _id (الذي يعبر عن الترتيب الزمني في MongoDB)
    // هنا ناخذ آخر عنصر في المصفوفة:
    const lastApartment = apartments[apartments.length - 1];

    return res.json({ storage: lastApartment.storage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

import Website from "../models/Website.js";

export const Website_Analytics = async (req, res) => {
  try {
    const { method, content } = req.body;

    let update = {};
    switch (method) {
      case "visit":
        update = { $inc: { visits: 1 } };
        break;
      case "owner_phone":
        update = { $push: { call_or_copy_owner_phone: content } };
        break;
      case "my_number":
        update = { $inc: { my_number_copies: 1 } };
        break;
      case "click_on_apartment":
        update = { $push: { clicks_on_apartments: content } };
        break;
      default:
        return res.status(400).json({ message: "method غير مدعوم" });
    }

    const website = await Website.findOneAndUpdate(
      {},
      update,
      { upsert: true, new: true } // ينشئ doc جديد إذا ما موجود + يرجع النسخة المحدّثة
    );

    return res.status(200).json({ message: "تم التحديث", website });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطأ في الخادم" });
  }
};

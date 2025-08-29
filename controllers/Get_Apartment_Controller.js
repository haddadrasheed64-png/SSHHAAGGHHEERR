import Apartment from "../models/Apartment.js";

export const Get_Apartments = async (req, res) => {
  try {
    const The_Apartments = await Apartment.find();
    if (The_Apartments.length === 0) {
      return res.status(404).json({ message: "لا توجد أي شقق مضافة حاليا" });
    }
    res.status(200).json(The_Apartments);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

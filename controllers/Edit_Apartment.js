import Apartment from "../models/Apartment.js";

export const Edit_Apertment = async (req, res) => {
  try {
    const {
      _id,
      gender,
      rent,
      payment_method,
      services,
      description,
      owner_phone,
      listing_type,
      currency,
      sale_price,
      status,
    } = req.body;

    const The_Apartment = await Apartment.findOne({ _id: _id });

    if (!The_Apartment) {
      return res.status(404).json({ message: "العقار غير موجودة" });
    }

    The_Apartment.gender = gender;
    The_Apartment.rent = rent;
    The_Apartment.payment_method = payment_method;
    The_Apartment.services.main_water = services.main_water;
    The_Apartment.services.office = services.office;
    The_Apartment.services.secure_month = services.secure_month;
    The_Apartment.description = description;
    The_Apartment.owner_phone = owner_phone;
    The_Apartment.listing_type = listing_type;
    The_Apartment.sale_price = sale_price;
    The_Apartment.currency = currency;
    status ? (The_Apartment.status = status) : null;

    await The_Apartment.save();
    res.status(200).json(The_Apartment);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("===== CONNECTED SUCCESSFULLY =====");
    }
    catch (error) {
        console.error("===== CONNECTION ERROR: ", error);
        process.exit(1); // بيسكّر التطبيق إذا الاتصال فشل
    }
};
export default connectDB;

import express from "express";
import connection from "./config/db.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
connection();
app.use(cors());
app.use(express.json({ limit: "30mb" })); // أو أكثر حسب الحاجة
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.get("/health", (req, res) => {
  res.send("K");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

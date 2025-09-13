import express from "express";
import { Login } from "../controllers/Login_controller.js";
import { Add_Apartment } from "../controllers/Add_Apartment_Controller.js";
import { Get_Apartments } from "../controllers/Get_Apartment_Controller.js";
import { Get_User } from "../controllers/Get_User_Controller.js";
import { Delete_Apartment } from "../controllers/Delete_Apartment_Controller.js";
import { Edit_Apertment } from "../controllers/Edit_Apartment.js";
import { Get_All_Users } from "../controllers/Get_All_Users_Controller.js";
import { Edit_User } from "../controllers/Edit_User_Controller.js";
import { Website_Analytics } from "../controllers/Add_Visit_Controller.js";
import { Get_Analytics } from "../controllers/Get_Analytics_Controller.js";

const router = express.Router();

router.post("/login", Login);
router.post("/addapartment", Add_Apartment);
router.get("/getapartments", Get_Apartments);
router.post("/getuser", Get_User);
router.delete("/deleteapartment", Delete_Apartment);
router.put("/editapartment", Edit_Apertment);
router.get("/getallusers", Get_All_Users);
router.put("/edituser", Edit_User);
router.post("/website", Website_Analytics);
router.get("/analytics", Get_Analytics);

export default router;

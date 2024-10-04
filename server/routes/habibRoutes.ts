import express from "express";
const router = express.Router();

import { view_Habib_Hospitals } from "../controllers/viewHabibData_Controller";

router.get("/habibHospitals", view_Habib_Hospitals);

export default router;

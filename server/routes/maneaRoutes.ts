import express from "express";
const router = express.Router();

import { view_Manea_Hospitals } from "../controllers/viewManeaData_Controller";

router.get("/maneaHospitals", view_Manea_Hospitals);

export default router;

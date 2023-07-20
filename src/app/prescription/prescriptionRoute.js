import { Router } from "express";
const router = Router();

import prescriptionController from "./prescriptionController.js";
//import { authentication } from '../../../config/jwtMiddleware.js';

router.get("/", prescriptionController.getPrescription_Controller); // 회원가입 API
router.get("/detail", prescriptionController.getPrescriptionDetail_Controller); // 회원가입 API
router.post("/register", prescriptionController.insertPrescription_Controller); // 회원가입 API
router.put("/update", prescriptionController.updatePrescription_Controller);
router.delete("/detail", prescriptionController.deleteMedicineInPSPT_Controller);
router.delete("/", prescriptionController.deletePrescription_Controller);

export default router;

import { Router } from "express";
const router = Router();

import medicineController from "./medicineController.js";
//import { authentication } from '../../../config/jwtMiddleware.js';

router.get("/test", medicineController.loadMedicineData); // 회원가입 API
router.get("/get", medicineController.getMedicineByItemSeq_Controller); // 회원가입 API
export default router;

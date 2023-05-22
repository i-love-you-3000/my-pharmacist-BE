import { Router } from "express";
const router = Router();

import prescriptionController from "./prescriptionController.js";
//import { authentication } from '../../../config/jwtMiddleware.js';

router.get("/", prescriptionController.getPrescription_Controller); // 회원가입 API

export default router;

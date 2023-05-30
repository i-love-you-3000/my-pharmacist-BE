import { Router } from "express";
const router = Router();

import combProhibitController from "./combProhibitController";
router.get("/test", combProhibitController.getCombProhibit_Controller); // 회원가입 API

export default router;

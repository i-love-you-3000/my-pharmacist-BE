import { Router } from "express";
const router = Router();

import combProhibitController from "./combProhibitController.js";
router.get("/test", combProhibitController.loadSideEffect); // 회원가입 API

export default router;

import { Router } from "express";
const router = Router();

import combProhibitController from "./combProhibitController.js";
router.get("/test", combProhibitController.loadSideEffect);
router.get("/", combProhibitController.getCombProhibitByItemSeq_Controller);

export default router;

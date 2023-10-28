import { Router } from "express";
const router = Router();

import { authentication, reissuanceAccessToken } from "../../config/jwtMiddleware.js";

router.get("/token", reissuanceAccessToken);

export default router;

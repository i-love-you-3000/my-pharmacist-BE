import { Router } from "express";
import userRoute from "../src/app/user/userRoute.js";
import medicineRoute from "../src/app/medicine/medicineRoute.js";
//import authRoute from '../src/auth/authRoute.js';
const router = Router();

router.use("/app/user", userRoute);
router.use("/app/medicine", medicineRoute);
//router.use('/auth', authRoute);

export default router;

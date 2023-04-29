import { Router } from 'express';
import userRoute from '../src/app/user/userRoute.js';
import authRoute from '../src/auth/authRoute.js';
const router = Router();

router.use('/app/users', userRoute);
router.use('/auth', authRoute);

export default router;
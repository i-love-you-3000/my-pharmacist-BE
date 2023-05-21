import { Router } from "express";
const router = Router();

import userController from "./userController.js";
//import { authentication } from '../../../config/jwtMiddleware.js';

router.post("/", userController.createUser_Controller); // 회원가입 API
router.post("/login", userController.login_Controller); // 로그인 API
router.post("/logout", userController.logout); //로그아웃 API

export default router;

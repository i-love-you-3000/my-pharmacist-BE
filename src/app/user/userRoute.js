import { Router } from "express";
const router = Router();

import userController from "./userController.js";

router.post("/", userController.createUser_Controller); // 회원가입 API
router.post("/login", userController.login_Controller); // 로그인 API
router.post("/logout", userController.logout); //로그아웃 API

//router.patch('/password', authentication, userController.updatePassword_Controller); // 비밀번호 변경 API

router.get("/profile", userController.getUserInfo_Controller); //프로필 API
//router.patch('/profile', authentication, userController.updateUserInfo_Controller); // 사용자 정보 수정 API

export default router;

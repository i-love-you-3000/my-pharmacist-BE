import { Router } from 'express';
const router = Router();

import userController from './userController.js';
import { authentication } from '../../../config/jwtMiddleware.js';

router.post('/', userController.postUser); // 회원가입 API
router.post('/login', userController.login); // 로그인 API
router.post('/logout', userController.logout); //로그아웃 API

router.patch('/password', authentication, userController.editUserPassword); // 비밀번호 변경 API

router.get('/profile', authentication, userController.getProfile); //프로필 API
router.patch('/profile', authentication, userController.editUserProfile); // 사용자 정보 수정 API

export default router;
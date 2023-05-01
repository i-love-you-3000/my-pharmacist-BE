import {
    createUser,
    userLogin,
    organizationUserLogin,
    updateUserProfile,
    changeUserPassword,
  } from './userService.js';
  import { retrieveUserProfile, getRentListByUserId } from './userProvider.js';
  import {
    SUCCESS,
    NICKNAME_EMPTY,
    PASSWORD_EMPTY,
    SIGNUP_NAME_EMPTY,
    ID_EMPTY,
    ID_LENGTH_ERROR,
    PASSWORD_LENGTH_ERROR,
  } from '../../../config/baseResponseStatus.js';
  import dotenv from 'dotenv';
  dotenv.config();
  
  class userController {
    /**
     * API No. 1
     * API Name : 사용자 회원가입  API
     * [POST] /app/users
     */
    //   userId: Nickname,
    //   password: Password,
    //   address: Address,
    //   detailAddress: DetailAddress,
    //   name: Name,
    //   ceoName: CEOName,
    //   phoneNumber: PhoneNumber,
    //   distinction: props.name, -- type
    //   info: Info,
    postUser = async function (req, res) {
      const parsedType = parseInt(req.body.type); // 회원 구분
      // type 1. 사용자, 2.조직/기관
      if (parsedType === 1) {
        // 사용자 회원가입
        // 사용자 테이블에 정보 입력
        const userId = req.body.id;
        const password = req.body.password;
        const userName = req.body.name;
        const type = parsedType;
        const info = req.body.info;
  
        if (!userId) return res.send(NICKNAME_EMPTY); // code 2000
        if (userId.length > 20) return res.send(ID_LENGTH_ERROR); // code 2012
        if (!password) return res.send(PASSWORD_EMPTY); // code 2001
        if (password.length < 6 || password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013
        if (!userName) return res.send(SIGNUP_NAME_EMPTY); // code 2005
  
        const signUpResponse = await createUser(userId, password, userName, type, info);
        return res.send(signUpResponse);
      }
    };
  
    /**
     *  API No. 2
     *  API Name : 사용자 로그인 API
     * [POST] /app/users/login
     */
    // type 1: 사용자, 2: 조직/기관
    login = async function (req, res) {
      const type = parseInt(req.body.type);
      if (type === 1) {
        // 사용자 로그인
        const userId = req.body.id;
        const password = req.body.password;
  
        if (!userId) return res.send(NICKNAME_EMPTY); // code 2009
        if (userId.length > 20) return res.send(ID_LENGTH_ERROR); // code 2012
        if (!password) return res.send(PASSWORD_EMPTY); // code 2003
        if (password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013
  
        const loginResult = await userLogin(userId, password, type);
        res.cookie('refreshToken', loginResult.refreshToken, {
          httpOnly: true,
          maxAge: 3000000,
        });
        return res.send(loginResult);
      }
    };
    /**
     *  API No. 5
     *  API Name : 로그아웃 API
     * [POST] /app/users/logout
     */
    logout = async function (req, res) {
      res.cookie('refreshToken', '', {
        httpOnly: true,
      });
      return res.send(SUCCESS);
    };
    /**
     *  API No. 9
     *  API Name : 사용자 비밀번호 수정 API
     * [PATCH] /app/users/edit_password
     */
    editUserPassword = async function (req, res) {
      const userId = req.id;
      const type = req.userType;
      const newPassword = req.body.newPassword;
      if (newPassword.length < 6 || newPassword.length > 20) return res.send(PASSWORD_LENGTH_ERROR);
      if (type == 1) {
        const userPasswordResult = await changeUserPassword(userId, newPassword);
        return userPasswordResult;
      }
    };
    /**
     *  API No. 4
     *  API Name : 사용자 프로필 API
     * [GET] /app/users/profile
     */
    getProfile = async function (req, res) {
      const userId = req.id;
      const profileResult = await retrieveUserProfile(userId);
      return res.send(profileResult);
    };
    /**
     *  API No. 7
     *  API Name : 사용자 정보수정 API
     * [PUT] /app/users/profile
     */
    editUserProfile = async function (req, res) {
      const userId = req.id;
      const { userName, info } = req.body;
  
      const editUserProfileResult = await updateUserProfile(userName, info, userId);
      return res.send(editUserProfileResult);
    };
    /**
     *  API No. 8
     *  API Name : 사용자 대여 리스트 API
     * [GET] /app/users/rentlist
     */
    getUserRentList = async function (req, res) {
      const userId = req.id;
      const userRentListResult = await getRentListByUserId(userId);
      return res.send(userRentListResult);
    };
  }
  export default new userController();
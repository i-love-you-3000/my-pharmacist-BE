import {
    createUser,
    userLogin,
    updateUserInfo,
    changeUserPassword,
  } from './userService.js';
  import {
    SUCCESS,
    PASSWORD_EMPTY,
    SIGNUP_NAME_EMPTY,
    ID_EMPTY,
    ID_LENGTH_ERROR,
    PASSWORD_LENGTH_ERROR,
    BIRTH_EMPTY,
    SEX_EMPTY,
    MEAL_EMPTY,
  } from '../../../config/baseResponseStatus.js';
  import dotenv from 'dotenv';
  dotenv.config();
  
  class userController {
    /**
     * API No. 1
     * API Name : 사용자 회원가입  API
     * [POST] /app/users
     */

    postUser = async function (req, res) {
      // 사용자 회원가입
        // 사용자 테이블에 정보 입력
        const id = req.body.id;
        const pw = req.body.pw;
        const userName = req.body.userName;
        const birth = req.body.birth;
        const sex = req.body.sex;
        const breakfast = req.body.breakfast;
        const lunch = req.body.lunch;
        const dinner = req.body.dinner;
        
        if (!id) return res.send(ID_EMPTY); // code 2007
        if (id.length < 6 || id.length > 20) return res.send(ID_LENGTH_ERROR); // code 2009
        if (!pw) return res.send(PASSWORD_EMPTY); // code 2001
        if (pw.length < 6 || password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013
        if (!userName) return res.send(SIGNUP_NAME_EMPTY); // code 2004
        if (!birth) return res.send(BIRTH_EMPTY);
        if (!sex) return res.send(SEX_EMPTY);
        if (!breakfast||!lunch||!dinner) return res.send(MEAL_EMPTY);

        const signUpResponse = await createUser(id, pw, userName, birth, sex, breakfast, lunch, dinner);
        return res.send(signUpResponse);
    };
  
    /**
     *  API No. 2
     *  API Name : 사용자 로그인 API
     * [POST] /app/users/login
     */
    login = async function (req, res) {
      // 사용자 로그인
      const id = req.body.id;
      const pw = req.body.pw;

      if (!id) return res.send(ID_EMPTY); // code 2007
      if (id.length < 6 || id.length > 20) return res.send(ID_LENGTH_ERROR); // code 2009
      if (!pw) return res.send(PASSWORD_EMPTY); // code 2001
      if (pw.length < 6 || password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013
      
      const loginResult = await userLogin(id, pw);
      res.cookie('refreshToken', loginResult.refreshToken, {
        httpOnly: true,
        maxAge: 3000000,
      });
      return res.send(loginResult);
    };
    /**
     *  API No. 3
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
     *  API No. 4
     *  API Name : 사용자 비밀번호 수정 API
     * [PATCH] /app/users/edit_password
     */
    editUserPassword = async function (req, res) {
      const id = req.id;
      const newPassword = req.body.newPassword;
      if (newPassword.length < 6 || newPassword.length > 20) return res.send(PASSWORD_LENGTH_ERROR);
      const userPasswordResult = await changeUserPassword(id, newPassword);
      return userPasswordResult;
    };
    /**
     *  API No. 5
     *  API Name : 사용자 프로필 API
     * [GET] /app/users/profile
     */
    getUserInfo = async function (req, res) {
      const id = req.id;
      const infoResult = await retrieveUserInfo(id);
      return res.send(infoResult);
    };
    /**
     *  API No. 6
     *  API Name : 사용자 정보수정 API
     * [PUT] /app/users/info
     */
    editUserInfo = async function (req, res) {
      const id = req.id;
      const { pw, userName, sex, breakfast, lunch, dinner } = req.body;
    
      const editUserProfileInfo = await updateUserInfo(id, pw, userName, sex, breakfast, lunch, dinner);
      return res.send(editUserProfileInfo);
    };
    /**
     *  API No. 7
     *  API Name : 사용자 대여 리스트 API
     * [GET] /app/users/medicinelist
     */
    getUserMedicineList = async function (req, res) {
      const id = req.id;
      const userMedicineListResult = await getMedicineList_Service(id);
      return res.send(userMedicineListResult);
    };
  }
  export default new userController();
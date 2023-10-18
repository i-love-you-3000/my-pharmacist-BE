import {
    createUser_Service,
    login_Service,
    updateUserInfo_Service,
    updatePassword_Service,
    getUserInfo_Service,
} from "./userService.js";
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
} from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
import { deleteUserToken_Service, getUserToken_Service, insertUserToken_Service } from "../userToken/userTokenService.js";
dotenv.config();

export class userController {
    /**
     * API No. 1
     * API Name : 사용자 회원가입  API
     * [POST] /app/users
     */

    createUser_Controller = async function (req, res) {
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
        console.log(id, pw);
        if (!id) return res.send(ID_EMPTY); // code 2007
        if (id.length < 6 || id.length > 20) return res.send(ID_LENGTH_ERROR); // code 2009
        if (!pw) return res.send(PASSWORD_EMPTY); // code 2001
        if (pw.length < 6 || password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013
        if (!userName) return res.send(SIGNUP_NAME_EMPTY); // code 2004
        if (!birth) return res.send(BIRTH_EMPTY);
        if (!sex) return res.send(SEX_EMPTY);
        if (!breakfast || !lunch || !dinner) return res.send(MEAL_EMPTY);

        const signUpResponse = await createUser_Service(id, pw, userName, birth, sex, breakfast, lunch, dinner);
        return res.send(signUpResponse);
    };

    /**
     *  API No. 2
     *  API Name : 사용자 로그인 API
     * [POST] /app/users/login
     */
    login_Controller = async function (req, res) {
        // 사용자 로그인
        const id = req.body.id;
        const pw = req.body.password;
        // if (!id) return res.send(ID_EMPTY); // code 2007
        // if (id.length < 6 || id.length > 20) return res.send(ID_LENGTH_ERROR); // code 2009
        // if (!pw) return res.send(PASSWORD_EMPTY); // code 2001
        // if (pw.length < 6 || password.length > 20) return res.send(PASSWORD_LENGTH_ERROR); // code 2013

        const loginResult = await login_Service(id, pw);
        res.cookie("refreshToken", loginResult.refreshToken, {
            httpOnly: true,
            maxAge: 3000000,
        });

        if (loginResult[0] !== undefined) {
            req.session.uid = result[0].id;
            1;
            req.session.isLogined = true;

            req.session.save();
            insertUserToken_Service(id);
        }

        console.log(loginResult);
        return res.send(loginResult);
    };
    /**
     *  API No. 3
     *  API Name : 로그아웃 API
     * [POST] /app/users/logout
     */
    logout = async function (req, res) {
        deleteUserToken_Service(getUserToken_Service(req.session.uid));
        delete req.session.uid;
        delete req.session.isLogined;
        req.session.save();
        res.cookie("refreshToken", "", {
            httpOnly: true,
        });
        return res.send(SUCCESS);
    };
    /**
     *  API No. 4
     *  API Name : 사용자 비밀번호 수정 API
     * [PATCH] /app/users/update_password
     */
    updatePassword_Controller = async function (req, res) {
        const id = req.id;
        const newPassword = req.body.newPassword;
        if (newPassword.length < 6 || newPassword.length > 20) return res.send(PASSWORD_LENGTH_ERROR);
        const userPasswordResult = await updatePassword_Service(id, newPassword);
        return userPasswordResult;
    };
    /**
     *  API No. 5
     *  API Name : 사용자 프로필 API
     * [GET] /app/users/profile
     */
    getUserInfo_Controller = async function (req, res) {
        const id = req.id;
        const infoResult = await getUserInfo_Service(id);
        console.log(infoResult);
        return res.send(infoResult);
    };
    /**
     *  API No. 6
     *  API Name : 사용자 정보수정 API
     * [PUT] /app/users/info
     */
    updateUserInfo_Controller = async function (req, res) {
        const id = req.id;
        const { pw, userName, sex, breakfast, lunch, dinner } = req.body;

        const updateUserProfileInfo = await updateUserInfo_Service(id, pw, userName, sex, breakfast, lunch, dinner);
        return res.send(updateUserProfileInfo);
    };
}
export default new userController();

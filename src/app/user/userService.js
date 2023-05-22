import { createUser_DAO, getUserInfo_DAO, updateUserInfo_DAO, updatePassword_DAO, getMedicineList_DAO } from "./userDao.js";
import { pool } from "../../../config/db.js";
import { ID_ALREADY_EXISTS, SUCCESS, FAIL, LOGIN_FAILURE, PASSWORD_WRONG, SIGNUP_SUCCESS, SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import dotenv from "dotenv";

dotenv.config("../../../.env");
// Create, Update, Delete

async function userIdCheck(userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const userIdRow = await selectUserId(connection, userId);
        return userIdRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function createUser_Service(id, pw, userName, birth, sex, breakfast, lunch, dinner) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const userIdCheckResult = await userIdCheck(id);
        if (userIdCheckResult.length > 0) return ID_ALREADY_EXISTS; // id가 이미 존재할 경우

        const hashedPassword = createHash("sha512").update(pw).digest("hex");
        const params = [id, hashedPassword, userName, birth, sex, breakfast, lunch, dinner];
        const createUserIdResult = await createUser_DAO(connection, params);
        console.log(`추가된 일반 사용자 Idx: ${createUserIdResult[0].insertId}, ID: ${id}`);
        connection.release();
        return SIGNUP_SUCCESS;
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    }
}

export async function login_Service(id, pw) {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
        const userIdCheckResult = await userIdCheck(id);
        if (userIdCheckResult.length < 1) return LOGIN_FAILURE; // code 1002 아이디가 존재 하지 않을 경우

        const hashedPassword = createHash("sha512").update(pw).digest("hex");
        const params = [id, hashedPassword];
        const checkResult = await getUserInfo_DAO(connection, params);

        if (checkResult.length >= 1) {
            // DB에서 비교후에 id가 존재할 경우
            const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "14 days" });
            return {
                isSuccess: true,
                code: 1000,
                message: "성공",
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } else {
            return PASSWORD_WRONG;
        }
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function updatePassword_Service(id, newPassword) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const hashedPassword = createHash("sha512").update(newPassword).digest("hex");
        const params = [hashedPassword, id];

        const changePasswordResult = await updatePassword_DAO(connection, params);
        return SUCCESS;
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function updateUserInfo_Service(userName, phoneNumber, address, info, userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const params = [userName, phoneNumber, address, info, userId];
        const updateUserProfileResponse = await updateUserInfo_DAO(connection, params);
        // console.log(updateUserProfileResponse.affectedRows);
        // console.log(updateUserProfileResponse.changedRows);
        // changedRows = 0 -> 변경된 내용 없음
        // changedRows = 숫자 -> 변경된 열 수
        return {
            isSuccess: true,
            code: 1000,
            message: "성공",
            data: {
                changedRows: updateUserProfileResponse.changedRows,
            },
        };
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getUserInfo_Service(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id];
        const retrieveUserInfoResult = await getUserInfo_DAO(connection, param);
        return {
            isSuccess: true,
            code: 1000,
            message: "성공",
            data: {
                changedRows: retrieveUserInfoResult.changedRows,
            },
        };
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getMedicineList_Service(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const getMedicineListResult = await getMedicineList_DAO(connection, id);
        return {
            isSuccess: true,
            code: 1000,
            message: "성공",
            data: {
                changedRows: getMedicineListResult.changedRows,
            },
        };
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function updateUserInfo(id, pw, userName, sex, breakfast, lunch, dinner) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const hashedPassword = createHash("sha512").update(newPassword).digest("hex");
        const param = [id, hashedPassword, userName, sex, breakfast, lunch, dinner];
        const updateUserInfoResult = await updateUserInfo_DAO(connection, param);
        return {
            isSuccess: true,
            code: 1000,
            message: "성공",
            data: {
                changedRows: updateUserInfoResult.changedRows,
            },
        };
    } catch (err) {
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

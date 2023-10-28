import { insertUserToken_Dao, getUserToken_Dao, deleteUserToken_Dao } from "./userTokenDao.js";
import {
    ID_ALREADY_EXISTS,
    SUCCESS,
    FAIL,
    LOGIN_FAILURE,
    PASSWORD_WRONG,
    SIGNUP_SUCCESS,
    SERVER_CONNECT_ERROR,
} from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config("../../../.env");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 100,
});

export async function insertUserToken_Service(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        let now = Date.now();

        const user_token = createHash("sha512")
            .update(id + now)
            .digest("hex");

        const params = [id, user_token];
        const userTokenRow = await insertUserToken_Dao(connection, params);
        return userTokenRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getUserToken_Service(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const userTokenRow = await getUserToken_Dao(connection, id);
        return userTokenRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deleteUserToken_Service(user_token) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const userTokenRow = await deleteUserToken_Dao(connection, user_token);
        return userTokenRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

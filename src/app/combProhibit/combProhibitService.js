import {
    insertCombProhibit_DAO,
    getCombProhibitByItemSeq_DAO,
    getCombProhibit_DAO,
    deleteCombProhibit_DAO,
} from "./combProhibitDao.js";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 100,
};

const dbPool = mysql.createPool(dbConfig);
export async function insertCombProhibit_Service(itemSeq, ingrName, mixtureItemSeq, mixtureIngr, prohibitContent) {
    const connection = await dbPool.getConnection(async (conn) => conn);
    try {
        const param = [itemSeq, ingrName, mixtureItemSeq, mixtureIngr, prohibitContent];
        const CombProhibitRow = await insertCombProhibit_DAO(connection, param);
        return CombProhibitRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getCombProhibit_Service(itemSeq, mixtureItemSeq) {
    const connection = await dbPool.getConnection(async (conn) => conn);
    try {
        const param = [itemSeq, mixtureItemSeq];
        const CombProhibitRow = await getCombProhibit_DAO(connection, param);
        return CombProhibitRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getCombProhibitByItemSeq_Service(itemSeq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const CombProhibitRow = await getCombProhibitByItemSeq_DAO(connection, itemSeq);
        return CombProhibitRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deleteCombProhibit_Service(itemSeq, mixtureItemSeq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [itemSeq, mixtureItemSeq];
        const CombProhibitRow = await deleteCombProhibit_DAO(connection, itemSeq);
        return CombProhibitRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

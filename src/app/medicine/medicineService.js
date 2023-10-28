import { getMedicineItemSeq_DAO, getMedicineByItemSeq_DAO, addMedicine_DAO } from "./medicineDao.js";
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
export async function addMedicine_Service(itemSeq, itemName, effect, image) {
    const connection = await dbPool.getConnection(async (conn) => conn);

    try {
        const param = [itemSeq, itemName, effect, image];
        const MedicineRow = await addMedicine_DAO(connection, param);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getMedicineByItemSeq_Service(itemSeq) {
    const connection = await dbPool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await getMedicineByItemSeq_DAO(connection, itemSeq);
        console.log(MedicineRow);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getMedicineItemSeq_Service() {
    const connection = await dbPool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await getMedicineItemSeq_DAO(connection);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

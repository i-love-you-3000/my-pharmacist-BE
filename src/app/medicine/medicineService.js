import { getMedicineItemSeq_DAO, getMedicineByItemSeq_DAO, addMedicine_DAO } from "./medicineDao.js";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gt7291",
    database: "my_ph",
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

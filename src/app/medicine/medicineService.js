import { getMedicineByClass_DAO, getMedicineByItemSeq_DAO, addMedicine_DAO } from "./medicineDao.js";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";

export async function addMedicine_Service(itemSeq, itemName, className, durSeq, chart, effect, image) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [itemSeq, itemName, className, durSeq, chart, effect, image];
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
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await getMedicineByItemSeq_DAO(connection, itemSeq);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getMedicineByClass_Service(className) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await getMedicineByClass_DAO(connection, className);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

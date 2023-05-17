import { getMedicineByClass_DAO, getMedicineByItemSeq_DAO, addMedicine_DAO } from "./medicineDao";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";

async function addMedicine_Service(itemSeq, itemName, className, durSeq, chart, effect, image) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [itemSeq, itemName, className, durSeq, chart, effect, image];
        const MedicineRow = await selectUserId(connection, param);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

async function getMedicineByItemSeq_Service(itemSeq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await selectUserId(connection, itemSeq);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

async function getMedicineByClass_Service(className) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const MedicineRow = await selectUserId(connection, className);
        return MedicineRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

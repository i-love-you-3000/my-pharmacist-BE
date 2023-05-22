import {
    insertPrescription_DAO,
    getPrescription_DAO,
    updatePrescription_DAO,
    deleteMedicineInPSPT_DAO,
    deletePrescription_DAO,
} from "./prescriptionDao.js";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
dotenv.config();
export async function insertPrescription_Service(id, item_seq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, item_seq];
        const prescriptionRow = await insertPrescription_DAO(connection, param);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getPrescription_Service(id) {
    //const connection = await pool.getConnection(async (conn) => conn);
    try {
        //const prescriptionRow = await getPrescription_DAO(connection, id);
        const prescriptionRow = { a: 1, b: 2, c: 3 };
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        //    connection.release();
    }
}

export async function updatePrescription_Service(id, new_item_seq, item_seq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [new_item_seq, id, item_seq];
        const prescriptionRow = await updatePrescription_DAO(connection, param);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deleteMedicineInPSPT_Service(id, item_seq, post_date) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, item_seq, post_date];
        const prescriptionRow = await deleteMedicineInPSPT_DAO(connection, param);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deletePrescription_Service(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const prescriptionRow = await deletePrescription_DAO(connection, id);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

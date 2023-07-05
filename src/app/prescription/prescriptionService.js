import {
    insertPrescription_DAO,
    getPrescription_DAO,
    updatePrescription_DAO,
    deleteMedicineInPSPT_DAO,
    deletePrescription_DAO,
} from "./prescriptionDao.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit: 100,
});

//prettier-ignore
export async function insertPrescription_Service(id, item_seq, register_date, breakfast, lunch, dinner, baw, intakePeriod, expPeriod) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, item_seq, register_date, breakfast, lunch, dinner, baw, intakePeriod, expPeriod];
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
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const prescriptionRow = await getPrescription_DAO(connection, id);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

//prettier-ignore
export async function updatePrescription_Service(id, item_seq, register_date, breakfast, lunch, dinner, baw, intakePeriod, expPeriod) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [register_date, breakfast, lunch, dinner, baw, intakePeriod, expPeriod, id, item_seq];
        const prescriptionRow = await updatePrescription_DAO(connection, param);
        return prescriptionRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deleteMedicineInPSPT_Service(id, item_seq, register_date) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, item_seq, register_date];
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

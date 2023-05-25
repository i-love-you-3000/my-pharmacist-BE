import { getMethod_DAO, insertMethod_DAO, deleteMethod_DAO, updateMethod_DAO } from "./methodDao.js";
import { pool } from "../../../config/db.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";

export async function insertMethod_Service(id, itemSeq, breakfast, lunch, dinner, baw, intakePeriod, expPeriod) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, itemSeq, breakfast, lunch, dinner, baw, intakePeriod, expPeriod];
        const methodRow = await insertMethod_DAO(connection, param);
        return methodRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function getMethod_Service(id, itemSeq) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, itemSeq];
        const methodRow = await getMethod_DAO(connection, param);
        return methodRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function deleteMethod_Service(className) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const methodRow = await deleteMethod_DAO(connection, className);
        return methodRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

export async function updateMethod_Service(id, itemSeq, expPeriod) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const param = [id, itemSeq, expPeriod];
        const methodRow = await deleteMethod_DAO(connection, param);
        return methodRow;
    } catch (err) {
        console.log(err);
        return SERVER_CONNECT_ERROR;
    } finally {
        connection.release();
    }
}

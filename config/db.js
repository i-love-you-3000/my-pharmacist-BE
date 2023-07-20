import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    dateStrings: true,
    connectionLimit: 100,
});

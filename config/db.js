import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();
export const pool = mysql.createPool({
  host : process.env.DB_HOST,
  port : process.env.PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PW,
  database : process.env.DB_DATABASE,
});

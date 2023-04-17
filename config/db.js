const mysql = require("mysql")
require('dotenv').config();

const conn = mysql.createPool({
  host : process.env.DB_HOST,
  port : process.env.PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PW,
  database : process.env.DB_DATABASE,
});

module.exports = {conn : conn,};
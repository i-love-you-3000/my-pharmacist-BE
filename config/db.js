const mysql = require("mysql")
const conn ={
  host : '127.0.0.1',
  port : '3306',
  user : 'root',
  password : 'gt7291',
  database : 'my_ph'
};

const connection = mysql.createConnection(conn);

module.exports = connection.connect();
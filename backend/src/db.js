const mysql = require("mysql2");

const db = mysql.createPool({
  host: "db",
  user: "root",
  password: "root",
  database: "hostel_db"
});

module.exports = db;

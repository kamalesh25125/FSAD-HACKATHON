const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "klh@1234",   // ✅ FIXED
  database: "hospital_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
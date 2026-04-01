const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",        // <-- put your MySQL password
  database: "hospital_db"
});

db.connect(err => {
  if (err) {
    console.log("Connection Error:", err.message);
  } else {
    console.log("MySQL Connected!");
  }
});
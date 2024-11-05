const mysql = require("mysql2")

var db = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  database:'groco_backend',
  password:"root"
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});
module.exports = db;
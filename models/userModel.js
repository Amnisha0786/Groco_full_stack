const db = require("../config/db");

const createUser = (username, hashPassword, email, timestamp) => {
  const query =
    "INSERT INTO Users (username, password, email, timestamp) VALUES (?, ?, ?, ?)";
  db.query(query, [username, hashPassword, email, timestamp], (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

function checkEmailExists(email, callback) {
  const query = "SELECT * FROM Users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, result.length > 0);
    }
  });
}

module.exports = {
  createUser,
  checkEmailExists,
};

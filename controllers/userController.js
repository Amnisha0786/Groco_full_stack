const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const db = require("../config/db");
// const {hashPassword} = require('../middleware/Helpers')
const { createUser, checkEmailExists } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../middleware/joiValidations");
const { UploadToS3 } = require("../middleware/uploadToS3");
const sgMail = require("@sendgrid/mail");
const API = process.env.SENDGRID_API;

//@desc REGISTER a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const { username, password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (username , password,email , timestamp) VALUES (?,?,?,?)";
    db.query(
      query,
      [username, hashPassword, email, timestamp],
      (error, results) => {
        if (error) {
          return console.error(error.message);
        }
        const accessToken = jwt.sign(
          {
            user: {
              _id: results.id,
            },
          },
          "123root",
          { expiresIn: "1d" }
        );
        res.status(201).json({
          username: username,
          password: hashPassword,
          email: email,
          timestamp: timestamp,
          token: accessToken,
        });
      }
    );
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).json({ message: error });
  }
});

module.exports = {
  registerUser,
};

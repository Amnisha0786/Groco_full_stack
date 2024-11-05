const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "Images",
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name, function (err, success) {
      if (err) throw err;
    });
  },
});

// Define the file size limit (in bytes)
const fileSizeLimit = 4 * 1024 * 1024; // 4MB

// Define the file filter function to validate the file type
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        JSON.stringify({ success: false, message: "invalid mime type" })
      ),
      false
    );
  }
};

// Set up multer with the defined storage engine, file filter, and size limit
// const upload = multer({ storage:Storage, fileFilter, limits: { fileSize: fileSizeLimit } });

router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/current", validateToken, currentUser);

module.exports = router;

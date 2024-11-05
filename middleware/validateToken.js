const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];

      //Get token from header
      jwt.verify(token, process.env.MONGO_URI, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Not Authorized" });
        }
        req.user = decoded.user;
        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Token is missing" });
  }
});

module.exports = validateToken;

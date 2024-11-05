const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();
const app = express();
// connectDb();



const port = process.env.PORT || 5000;
//middleware for json body
app.use(express.json());
//middleware for form data body
app.use(express.urlencoded({ extended: false }));
// app.use('/images', express.static('Images'));


app.use("/api/groco/users", require("./routes/userRoutes"));
// app.use("/api/groco/invoice", require("./routes/invoiceRoutes"));

app.listen(port, () => {
  console.log("Server running on port", port);
});

const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.get("/", getAllInvoices).post("/", createInvoice);
router
  .get("/:id", getInvoice)
  .put("/:id", updateInvoice)
  .delete("/:id", deleteInvoice);

module.exports = router;
